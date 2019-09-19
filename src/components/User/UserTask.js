import React from 'react'
import {Accordion, Card} from "react-bootstrap";

const UserTask = ({children, task, }) => {
    return (
        <Accordion>
            <Card key={task.draggableId}>
                <Accordion.Toggle as={Card.Header} eventKey={task.draggableId}>
                    <span>DragId: <b>{task.draggableId}</b> | Id: <b>{task.id}</b>  .</span> {task.title} | {task.taskInfo.spent_time ? `${task.taskInfo.spent_time} day` : ''} | {task.taskInfo.status}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={task.draggableId}>
                    <Card.Body>
                        <div dangerouslySetInnerHTML={{__html: task.description}} />
                        {children}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
};

export default UserTask