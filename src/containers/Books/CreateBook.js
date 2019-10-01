import React, { Component } from 'react';
import { connect } from 'react-redux';
import Col from "react-bootstrap/Col";

import { addBook } from '../../actions/book'
import { AddBookForm } from "../../components/Book/AddBookForm";

class CreateBook extends Component {

    handleSubmit = book => {
        this.props.createBook(book);
        this.props.history.push('/')
    };

    render() {
        return (
            <>
                <Col xs={5}>
                <AddBookForm handleSubmit={this.handleSubmit}/>
                </Col>
            </>
        )
    }
}

const mapDispatchProps = dispatch => {
    return {
        createBook: (book) => dispatch(addBook(book))
    }
};

export default connect(null, mapDispatchProps)(CreateBook);