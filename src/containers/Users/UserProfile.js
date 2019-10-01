import React from "react";
import {connect} from "react-redux";
import * as moment from 'moment';
import {Row, Col, ButtonToolbar} from "react-bootstrap";

import {getUserById} from "../../actions/user";
import {changeSpentTimeOfTasks} from "../../actions/task";

import UserTask from "../../components/User/UserTask";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import CustomSpinner from "../../components/Spinner/CustomSpinner";
import CustomButton from "../../components/Button/CustomButton";
import UserInfo from "../../components/User/UserInfo";

class UserById extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            planId: '',
        };
    }

    async componentDidMount() {
        const {id} = this.props.match.params;

        await this.getUserInfoById(id)
    }

    getUserInfoById = async id => {
        await this.props.getUserById(id);

        if (this.props.user.userById.plan) await this.getPreparedTasks();
    };

    getPreparedTasks = async () => {
        const {order: orderValues, tasks, id: planId} = this.props.user.userById.plan;
        let tasksNew = [];

        tasks.reduce((acc, current, index) => {
            tasks.forEach(item => {
                if (orderValues[index] === item.id) return tasksNew.push(item);
            });

            current.draggableId = orderValues[index];

            return [...acc, current, orderValues[index]]
        }, []);

        await this.setState({tasks: tasksNew, planId});
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

    render() {
        const {
            user: {
                userById,
                userById: {isLoading},
                currentUser
            },
            task: {
                isLoading: isLoadingTask,
                refreshSpentTimeTaskId
            }
        } = this.props;
        return (
            <>
                <Row>
                    <Col md={{span: 6, offset: 3}}>
                        <h2 style={{textAlign: "center", marginBottom: "20px"}}>My Profile</h2>
                    </Col>
                </Row>
                <UserInfo user={currentUser}/>
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
                        </Row>
                        <Row>
                            <Col xs={12}>
                                {this.state.tasks.map((task, index) => (
                                    <UserTask key={index} task={task}>
                                        <ButtonToolbar>
                                            {task.taskInfo.status !== 'done'
                                                ?
                                                <CustomButton label={"Start Task"}
                                                              itemId={task.id}
                                                              isLoading={refreshSpentTimeTaskId === task.id && isLoadingTask ? isLoadingTask : ''}
                                                              statusOfItem={task.taskInfo.status}
                                                              handleSubmit={this.startStopTask}
                                                              secondLabel={"Stop Task"}/>
                                                :
                                                ''
                                            }
                                        </ButtonToolbar>
                                    </UserTask>
                                ))}
                            </Col>
                        </Row>
                    </>
                    :
                    ""
                }
                {userById.plan === null ?
                    <Row>
                        <AlertMessage message={'User don\'t have a plan'}/>
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

const mapStateToProps = store => {
    return {
        user: store.user,
        task: store.task
    }
};

const mapDispatchProps = dispatch => {
    return {
        getUserById: (id) => dispatch(getUserById(id)),
        changeSpentTimeOfTasks: (params) => dispatch(changeSpentTimeOfTasks(params))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(UserById);