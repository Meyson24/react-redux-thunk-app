import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBook } from '../../actions'
import { Form, Button, Col, Alert } from "react-bootstrap";

class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = {title: '', description: '', price: '', error: false};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.persist();
        const {name, value} = e.target;
        this.setState({[name]: value});
        const {title, description, price} = this.state;

        // hide error if user write
        if (!(title && description && price)) {
            this.setState({error: false});
            return;
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {title, description, price} = this.state;

        if (!(title && description && price)) {
            this.setState({error: true});
            return;
        }

        let book = JSON.stringify({
            title,
            description,
            price,
        });

        this.props.onAddBook(book);
        this.setState({title: '', description: '', price: ''});
        this.props.history.push(`/`)
    }

    render() {
        const {title, description, price, error} = this.state;
        return (
            <div>
                {error ?
                    <Alert variant='danger'>
                        Please enter title, description and price.
                    </Alert>
                    : ''
                }
                <h1>Create Book</h1>
                <Col xs={5}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"
                                          name="title"
                                          placeholder="Enter title"
                                          value={title}
                                          onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBody">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text"
                                          name="description"
                                          placeholder="Enter description"
                                          value={description}
                                          onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBody">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text"
                                          name="price"
                                          placeholder="Enter price"
                                          value={price}
                                          onChange={this.handleChange}/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Form>
                </Col>
            </div>
        );
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        onAddBook: (book) => dispatch(addBook(book))
    }
};

export default connect(null, mapDispatchProps)(PostForm);