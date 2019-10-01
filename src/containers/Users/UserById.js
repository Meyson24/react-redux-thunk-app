import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Button, Row, Col, ButtonToolbar} from "react-bootstrap";

import {getUserById} from "../../actions/user";
import {changeSpentTimeOfTasks, getTasks} from "../../actions/task";
import {changeOrderTasksOfPlan} from "../../actions/plan";
import {deleteTask} from "../../actions/task";

import {Checkbox, CheckboxGroup} from '../../components/Checkbox/Checkbox';
import DraggableList from '../../components/DraggbleList/DraggableList';
import UserTask from "../../components/User/UserTask";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import CustomSpinner from "../../components/Spinner/CustomSpinner";
import CustomButton from "../../components/Button/CustomButton";
import MyModal from "../../components/Modal/MyModal";
import CollapseBlock from "../../components/Modal/CollapseBlock";

import { Formik, Field } from "formik";
import * as Yup from 'yup';

const initialValues = {checkboxGroup: []}
const validationSchema =
    Yup.object().shape({
        checkboxGroup: Yup.array().required(
            "At least one checkbox is required"
        ),
    })

class UserById extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            planId: '',
            show: false,
            setShow: false,
        };

        this.changeOrderItems = this.changeOrderItems.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    async componentDidMount() {
        const {id} = this.props.match.params;

        await this.getUserInfoById(id)
    }

    getUserInfoById = async id => {
        await this.props.getUserById(id);

        if (this.props.user.userById.plan) await this.getPreparedTasks();

        await this.props.getTasks()
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

    deleteTask = async taskId => {
        const params = {taskId, planId: this.state.planId};

        this.setState({
            tasks: this.state.tasks.filter((task) => {
                return task.id !== taskId
            })
        });

        await this.props.deleteTask(params);
    };

    changeOrderItems(tasks, itemsOrder) {
        this.setState({tasks: tasks})
        this.props.changeOrderTasksOfPlan(this.state.planId, itemsOrder)
    }

    handleClose = () => {
        this.setState({show:false})
    };
    handleShow = () => {
        this.setState({show:true})

    };


    render() {
        const {user: {userById, userById: {isLoading}}, task: {isLoading: isLoadingTask, refreshSpentTimeTaskId}} = this.props;
        console.log("this.this.props.tasks", this.props)
        return (
            <>


                <ButtonToolbar>
                    <Button variant="primary" onClick={this.handleShow}>
                        Launch demo modal
                    </Button>

                    <MyModal show={this.state.show} onHide={this.handleClose}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, actions) => {
                                setTimeout(() => {
                                    console.log(JSON.stringify(values, null, 2));
                                    actions.setSubmitting(false);
                                }, 500);
                            }}
                            render={({
                                         handleSubmit,
                                         setFieldValue,
                                         setFieldTouched,
                                         values,
                                         errors,
                                         touched,
                                         isSubmitting
                                     }) => (
                                <form onSubmit={handleSubmit}>
                                    <h2>Checkbox group</h2>
                                    <CheckboxGroup
                                        id="checkboxGroup"
                                        label="Which of these?"
                                        value={values.checkboxGroup}
                                        error={errors.checkboxGroup}
                                        touched={touched.checkboxGroup}
                                        onChange={setFieldValue}
                                        onBlur={setFieldTouched}
                                    >
                                        <Field
                                            component={Checkbox}
                                            name="checkboxGroup"
                                            id="111"
                                            label="Option 111"
                                        />
                                        <Field
                                            component={Checkbox}
                                            name="checkboxGroup"
                                            id="222"
                                            label="Option 222"
                                        />
                                        <Field
                                            component={Checkbox}
                                            name="checkboxGroup"
                                            id="333"
                                            label="Option 333"
                                        />
                                        <Field
                                            component={Checkbox}
                                            name="checkboxGroup"
                                            id="444"
                                            label="Option 444"
                                        />
                                    </CheckboxGroup>

                                    <button type="submit" disabled={isSubmitting}>
                                        Submit
                                    </button>
                                </form>
                            )}
                        />
                        {this.props.tasks.map((task, index) => (
                            <div>
                                <UserTask key={index} task={task}></UserTask>

                            </div>

                        ))}
                        <CollapseBlock></CollapseBlock>
                    </MyModal>
                </ButtonToolbar>


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
                                <DraggableList items={this.state.tasks}
                                               changeOrderItems={this.changeOrderItems}
                                               options={{planId: this.state.planId}}>
                                    {(task) => (
                                        <UserTask task={task} status={task.taskInfo.status} spentTime={task.taskInfo.spent_time}>
                                            <ButtonToolbar>
                                                <CustomButton label={"Delete"}
                                                              itemId={task.id}
                                                              type={"danger"}
                                                              handleSubmit={this.deleteTask}/>

                                                <Link style={{textDecoration: 'none'}} to={{
                                                    pathname: `/users/${userById.id}/plans/${userById.plan.id}/tasks/${task.id}/edit`
                                                }}>
                                                    <CustomButton label={"Edit Task"}
                                                                  type={"info"}/>
                                                </Link>
                                            </ButtonToolbar>
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

UserById.defaultProps = {
    userById: {
        plan: {id: 1, title: '', description: '', tasks: [], order: []}
    },
};

UserById.propTypes = {
    userById: PropTypes.object,
};

const mapStateToProps = store => {
    return {
        user: store.user,
        task: store.task,
        tasks: store.task.tasks
    }
};

const mapDispatchProps = dispatch => {
    return {
        getUserById: (id) => dispatch(getUserById(id)),
        getTasks: () => dispatch(getTasks()),
        deleteTask: (id) => dispatch(deleteTask(id)),
        changeOrderTasksOfPlan: (planId, tasksOrder) => dispatch(changeOrderTasksOfPlan(planId, tasksOrder)),
        changeSpentTimeOfTasks: (params) => dispatch(changeSpentTimeOfTasks(params))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(UserById);