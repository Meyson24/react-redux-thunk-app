import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getTaskById, updateTaskById} from '../../actions/task'
import {TaskForm} from "../../components/Task/TaskForm";


class EditTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            descriptionOfTask: '',
        };
    }

    async componentDidMount() {
        const { taskId } = this.props.match.params;

        await this.props.getTaskById(taskId)
    }

    getTextOfEditor = descriptionOfTask => {
        this.setState({ descriptionOfTask });
    };

    handleSubmit = (taskInfo) => {
        const { userId, taskId } = this.props.match.params;
        const { descriptionOfTask:description } = this.state;
        const params = {description, title: taskInfo.title}

        this.props.updateTaskById(taskId, params);
        this.props.history.push(`/users/${userId}/plan`)
    };

    render() {
        const {task} = this.props;

        return (
            <div>
                {
                    this.props.task.isLoading ?
                        ''
                        :
                        <TaskForm buttonName={'Edit'} task={task} getTextOfEditor={this.getTextOfEditor} handleSubmit={this.handleSubmit}/>
                }

            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        task: store.task
    }
};

const mapDispatchProps = dispatch => {
    return {
        getTaskById: (taskId) => dispatch(getTaskById(taskId)),
        updateTaskById: (taskId, params) => dispatch(updateTaskById(taskId, params))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(EditTask);