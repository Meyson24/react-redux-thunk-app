import {Button, Modal, Container, Col, Row} from "react-bootstrap";
import React from "react";
import CustomSpinner from "../Spinner/CustomSpinner";

const MyModal = (props) => {
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Using Grid in Modal
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className="show-grid">
                        <Col xs={12} md={8}>
                            <code>.col-xs-12 .col-md-8</code>
                        </Col>
                    </Row>

                    <Row className="show-grid">
                        <Col xs={12} md={12}>
                            {props.children}
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                {/*<Button onClick={props.onHide}>Close</Button>*/}
            </Modal.Footer>
        </Modal>
    )
};

export default MyModal
