import React from "react";
import {connect} from "react-redux";

import {getBookById} from "../../actions/book";
import BookItem from '../../components/Book/BookItem';

class Book extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('this.props.match.params', this.props.match.params);
        const { id } = this.props.match.params;
        this.props.getBookById(id);
    }

    getBookById = id => {
        this.props.getBookById(id);
    };

    render() {
        const { book } = this.props.book;
        return (
            <>
                <BookItem showLinkToBook={false} book={book}/>
            </>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        book: store.book
    }
};

const mapDispatchProps = (dispatch) => {
    return {
        getBookById: (id) => dispatch(getBookById(id))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(Book);