import React from 'react'
import {Button, ButtonToolbar, Spinner} from "react-bootstrap";
import CustomButton from '../Button/CustomButton'
import {Link} from "react-router-dom";

const UserActionsButtons = ({userId, taskId, planId, deleteTask, isLoading, statusOfTask, startStopTask, isRefreshSpentTimeTaskId}) => {
    return (
        <>
            <ButtonToolbar>
                <CustomButton label={"Delete"}
                              itemId={taskId}
                              type={"danger"}
                              handleSubmit={deleteTask}/>

                {statusOfTask !== 'done'
                    ?
                    <CustomButton label={"Start Task"}
                                  itemId={taskId}
                                  isLoading={isRefreshSpentTimeTaskId === taskId && isLoading ? isLoading : ''}
                                  statusOfItem={statusOfTask}
                                  handleSubmit={startStopTask}
                                  secondLabel={"Stop Task"}/>
                    :
                    ''
                }

                <Link style={{textDecoration: 'none'}} to={{
                    pathname: `/users/${userId}/plans/${planId}/tasks/${taskId}/edit`
                }}>
                    <CustomButton label={"Edit Task"}
                                  type={"info"}/>
                </Link>
            </ButtonToolbar>
        </>
    )
};

export default UserActionsButtons