import React from 'react'
import {Jumbotron, Button, Pagination} from "react-bootstrap";
import {Link} from "react-router-dom";

const PlanItem = ({plan}) => (
    <Jumbotron>
        <h1>Plan: {plan.title}</h1>
        <p>Description: {plan.description}</p>
        <p>Developers: {plan.developers.email}</p>
        <p>Tasks:
            {plan.tasks.map(task => (
                    <li>{task.title}</li>
                )
            )}
        </p>

    </Jumbotron>
);

export default PlanItem