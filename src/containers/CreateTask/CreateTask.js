import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addTask} from '../../actions/task'
import {TaskForm} from "../../components/Task/TaskForm";


class CreateTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            descriptionOfTask: '',
        };
    }

    getTextOfEditor = descriptionOfTask => {
        this.setState({ descriptionOfTask });
    };

    handleSubmit = async taskInput => {
        const { userId, planId } = this.props.match.params;
        const { descriptionOfTask:description } = this.state;
        const params = {planId, description, title: taskInput.title}

        await this.props.createTask(params);
        this.props.history.push(`/users/${userId}`)
    };

    render() {
        return (
            <div>
                <TaskForm buttonName={"Create"} getTextOfEditor={this.getTextOfEditor} handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

const mapDispatchProps = dispatch => {
    return {
        createTask: (params) => dispatch(addTask(params))
    }
};

export default connect(null, mapDispatchProps)(CreateTask);