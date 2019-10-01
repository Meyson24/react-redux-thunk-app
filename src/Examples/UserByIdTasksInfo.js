import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import * as moment from 'moment';

import {getUserById} from "../actions/user";
import DraggableList from '../components/DraggbleList/DraggableList';

import {changeSpentTimeOfTasks} from "../actions/task";
import {changeOrderTasksOfPlan} from "../actions/plan";

import {Link} from "react-router-dom";
import {Button, Row, Col} from "react-bootstrap";
import UserTask from "../components/User/UserTask";
import UserActionsButtons from "../components/User/UserActionsButtons";
import {deleteTask} from "../actions/task";
import AlertMessage from "../components/AlertMessage/AlertMessage";
import Html from 'slate-html-serializer'
import {rules} from '../components/RichTextEditor/rules.js'
import CustomSpinner from "../components/Spinner/CustomSpinner";

const html = new Html({rules});

class UserByIdTasksInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            planId: '',
        };

        this.onDragEnd = this.onDragEnd.bind(this);
        // this.getTasks = this.getTasks.bind(this);
        this.reorder = this.reorder.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    async componentDidMount() {
        const {id} = this.props.match.params;

        await this.getUserInfoById(id)
    }

    getUserInfoById = async id => {
        await this.props.getUserById(id);

        if (this.props.user.userById.plan) await this.getTasks();
    };

    // getTasks = () => {
    //     const {order: orderValues, tasks, id: planId} = this.props.user.userById.plan;
    //     let tasksNew = [];
    //
    //     tasks.reduce((acc, current, index) => {
    //         tasks.forEach(item => {
    //             if (orderValues[index] === item.id) return tasksNew.push(item);
    //         });
    //
    //         current.draggableId = orderValues[index];
    //
    //         return [...acc, current, orderValues[index]]
    //     }, []);
    //
    //     this.setState({tasks: tasksNew, planId});
    // };

    deleteTask = async taskId => {
        const params = {taskId, planId: this.state.planId};

        this.setState({
            tasks: this.state.tasks.filter((task) => {
                return task.id !== taskId
            })
        });

        await this.props.deleteTask(params);
    };

    startStopTask = async taskId => {
        const nowTime = moment().format('YYYY-MM-DD');
        const params = {taskId, time: nowTime, planId: this.state.planId};

        await this.props.changeSpentTimeOfTasks(params);
        await this.refreshStatusTimeOfTask();
    };

    refreshStatusTimeOfTask = async () => {
        let tasks = Array.from(this.state.tasks);

        await tasks.map(task => {
            if (task.id === this.props.task.task_id) {
                task.taskInfo.status = this.props.task.status;
                task.taskInfo.spent_time = this.props.task.spent_time;
            }
        });

        this.setState({tasks});
    };

    async onDragEnd(result) {
        const {planId} = this.state;
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const tasks = this.reorder(
            this.state.tasks,
            result.source.index,
            result.destination.index
        );
        const tasksOrder = tasks.map((task) => task.id);

        this.props.changeOrderTasksOfPlan(planId, tasksOrder);
        this.setState({
            tasks
        });


    }

    reorder(list, startIndex, endIndex) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);

        result.splice(endIndex, 0, removed);
        return result;
    };

    render() {
        const {user: {userById, userById: {isLoading}}} = this.props;

        return (
            <>
                <Row>
                    <Col md={{span: 6, offset: 3}}>
                        <h2 style={{textAlign: "center", marginBottom: "20px"}}>Plan</h2>
                    </Col>
                </Row>
                {userById.plan ?
                    <>
                        <Row style={{marginBottom: "20px"}}>
                            <Col xs={9}>
                                <h4>{userById.plan.title}</h4>

                            </Col>
                            <Col xs={3}>
                                <Link style={{textDecoration: 'none'}} to={{
                                    pathname: `/users/${userById.id}/plans/${userById.plan.id}/tasks/new`
                                }}>
                                    <Button variant="success" style={{width: '150px'}}>
                                        Create New Task
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <DraggableList onDragEnd={this.onDragEnd} items={this.state.tasks}>
                                    {(task) => (
                                        <UserTask task={task}>
                                            <UserActionsButtons
                                                userId={userById.id}
                                                taskId={task.id}
                                                planId={userById.plan.id}
                                                deleteTask={this.deleteTask}
                                                isLoading={this.props.task.isLoading}
                                                statusOfTask={task.taskInfo.status}
                                                startStopTask={this.startStopTask}
                                                isRefreshSpentTimeTaskId={this.props.task.refreshSpentTimeTaskId}
                                            />
                                        </UserTask>
                                    )}
                                </DraggableList>
                            </Col>
                        </Row>
                    </>
                    :
                    ""
                }
                {userById.plan === null ?
                    <Row>
                        <AlertMessage message={'User don\'t have a plan'}/>
                        <Col xs={2}>
                            <Link style={{textDecoration: 'none'}} to={{
                                pathname: `/users/${userById.id}/plans/new`
                            }}>
                                <Button variant="success">
                                    Create Plan
                                </Button>
                            </Link>
                        </Col>
                    </Row> : ""
                }
                {isLoading ?
                    <Row>
                        <Col md={{span: 6, offset: 3}} style={{textAlign: "center"}}>
                            <CustomSpinner style={{textAlign: "center"}}/>
                        </Col>
                    </Row> : ""
                }
            </>

        );
    }
}

// UserById.defaultProps = {
//     userById: {
//         plan: {id: 1, title: '', description: '', tasks: [], order: []}
//     },
// };
//
// UserById.propTypes = {
//     userById: PropTypes.object,
// };

const mapStateToProps = store => {
    return {
        user: store.user,
        task: store.task
    }
};

const mapDispatchProps = dispatch => {
    return {
        getUserById: (id) => dispatch(getUserById(id)),
        deleteTask: (id) => dispatch(deleteTask(id)),
        changeOrderTasksOfPlan: (planId, tasksOrder) => dispatch(changeOrderTasksOfPlan(planId, tasksOrder)),
        changeSpentTimeOfTasks: (params) => dispatch(changeSpentTimeOfTasks(params))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(UserByIdTasksInfo);