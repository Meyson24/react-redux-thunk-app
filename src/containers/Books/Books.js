import React, {Component} from 'react';
import {connect} from 'react-redux';

import {sortByParameterAndMethod} from '../../actions/book'
import {getBooks} from '../../actions/book'

import BookItem from '../../components/Book/BookItem';
import SortPanel from "../../components/SortPanel/SortPanel";
import PaginationItems from "../../components/Pagination/PaginationItems";

import {Row} from "react-bootstrap";
import Col from "react-bootstrap/es/Col";

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: 'default',
            methodOfSort: 'asc',
        }
    }

    componentDidMount() {
        this.goToBookPage(1);
    }

    goToBookPage = async page => {
        await this.props.getBooks({page: page, per_page: 3});
    };

    sortingOfBooks = parameter => {
        const methodOfSort = this.state.methodOfSort === 'asc' ? 'desc' : 'asc';

        this.setState({methodOfSort: methodOfSort, isActive: parameter});
        this.props.sortByParameterAndMethod({sortItem: parameter, sortMethod: methodOfSort})
    };

    render() {
        const {total, page} = this.props.pagination;

        return (
            <>
                <h1 className="align-content-center">All Posts</h1>

                <Row className="justify-content-md-center">
                    <SortPanel isSorting={this.sortingOfBooks} isActive={this.state.isActive}
                               methodOfSort={this.state.methodOfSort}/>
                </Row>

                {this.props.books.map((book) => (
                    <div key={book.id}>
                        <BookItem key={book.id} book={book} showLinkToBook={true}/>
                    </div>))
                }

                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <PaginationItems page={page}
                                         total={total}
                                         goToBookPage={this.goToBookPage}/>
                    </Col>
                </Row>
            </>
        );
    }
}

const mapStateToProps = store => {
    return {
        books: store.book.books,
        pagination: store.book.pagination
    }
};

const mapDispatchProps = dispatch => {
    return {
        getBooks: ({page, per_page}) => dispatch(getBooks({page, per_page})),
        sortByParameterAndMethod: (posts, param, method) => dispatch(sortByParameterAndMethod(posts, param, method)),
    }
};

export default connect(mapStateToProps, mapDispatchProps)(Books);