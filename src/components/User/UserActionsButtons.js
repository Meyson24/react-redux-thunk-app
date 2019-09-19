import React from 'react'
import {Button, ButtonToolbar, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";

const UserActionsButtons = ({userId, taskId, planId, deleteTask, isLoading, statusOfTask, startStopTask, isRefreshSpentTimeTaskId}) => {
    return (
        <>
            <ButtonToolbar>
                <Button style={{marginRight: '20px'}} variant="danger"
                        onClick={() => deleteTask(taskId)}>Delete</Button>

                {statusOfTask !== 'done'
                    ?
                    <div>
                        {isRefreshSpentTimeTaskId === taskId
                            ?
                            <Button style={{marginRight: '20px'}} variant="primary" disabled>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                {
                                    statusOfTask === 'in progress'
                                        ?
                                        'Stop Task'
                                        :
                                        'Start Task'
                                }
                                <span className="sr-only">Loading...</span>
                            </Button>
                            :
                            <Button style={{marginRight: '20px'}} onClick={() => startStopTask(taskId)}
                                    variant="primary">
                                {
                                    statusOfTask === 'in progress'
                                        ?
                                        'Stop Task'
                                        :
                                        'Start Task'
                                }
                            </Button>
                        }
                    </div>
                    :
                    ''
                }

                <Link style={{textDecoration: 'none'}} to={{
                    pathname: `/users/${userId}/plans/${planId}/tasks/${taskId}/edit`
                }}>
                    <Button style={{marginRight: '20px'}} variant="info">
                        Edit Task
                    </Button>
                </Link>
            </ButtonToolbar>
        </>
    )
};

export default UserActionsButtons