import React, { Component } from 'react';
import { connect } from 'react-redux';
import Col from "react-bootstrap/Col";

import { addBook } from '../../actions/book'
import { AddBookForm } from "../../components/Book/AddBookForm";

class Book extends Component {
    constructor(props) {
        super(props)
        this.state = {title: '', description: '', price: '', errorTitle: false, errorDescription: false, errorPrice: false, error: ''};
    }

    handleSubmit = book => {
        this.props.onAddBook(book);
        this.props.history.push('/')
    }

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

const mapDispatchProps = (dispatch) => {
    return {
        onAddBook: (book) => dispatch(addBook(book))
    }
};

export default connect(null, mapDispatchProps)(Book);