import React from 'react'
import {Col, Row} from "react-bootstrap";

const AlertMessage = ({message}) => {
    return (
        <Col xs={10}>
            <h4>{message}</h4>
        </Col>
    )
};

export default AlertMessage