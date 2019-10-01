import React from 'react'
import {ButtonToolbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import UserTask from "../components/User/UserTask";
import CustomButton from "../components/Button/CustomButton";
import DraggableList from "../components/DraggbleList/DraggableList";

const UserPlanInfo = ({items, }) => (
    <DraggableList items={items}
                   changeOrderItems={this.changeOrderItems}
                   options={{planId: this.state.planId}}>
        {(task) => (
            <UserTask task={task}>
                <ButtonToolbar>
                    <CustomButton label={"Delete"}
                                  itemId={task.id}
                                  type={"danger"}
                                  handleSubmit={this.deleteTask}/>

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
);

export default UserPlanInfo