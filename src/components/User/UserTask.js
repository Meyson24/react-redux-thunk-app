import React from 'react'
import {Accordion, Card} from "react-bootstrap";

const UserTask = ({children, task, status='', spentTime=''}) => {
    return (
        <Accordion defaultActiveKey="0">
            <Card key={task.draggableId}>
                <Accordion.Toggle as={Card.Header} eventKey={task.draggableId}>
                    {task.title} {status} {spentTime ? `${spentTime} day's` : ''}
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