import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { sortByParameterAndMethod } from '../../actions/book'
import { getBooks } from '../../actions/book'

import BookItem from '../../components/Book/BookItem';
import SortPanel from "../../components/SortPanel/SortPanel";
import PaginationItems from "../../components/Pagination/PaginationItems";

class Books extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // isActive: 'default',
            // methodOfSort: 'asc',
            // id: '',
            // title: '',
            // descriptions: '',
            // price: 0,
            // users: null,
            total: null,
            per_page: null,
            currentPage: 1,
            totalPagesNum: 0,
            totalPages: [],
        }
    }

    componentDidMount() {
        this.onGoToPage(1);
    }

    onGoToPage = page => {
        this.props.getBooks({page: page, per_page:3});

        const totalPagesNum = this.props.pagination.total;
        const currentPage = this.props.pagination.page;
        // console.log('onGoToPage currentPage totalPagesNum', currentPage, totalPagesNum);

        const totalPages = [...Array(totalPagesNum).keys()].map(i => ++i);
        // console.log('onGoToPage totalPages', totalPages)

        this.setState({
            totalPages,
            totalPagesNum,
            currentPage: parseInt(currentPage)
        });
    };

    sortingOfBooks = parameter => {
        const methodOfSort = this.state.methodOfSort === 'asc' ? 'desc' : 'asc';
        this.setState({methodOfSort: methodOfSort, isActive: parameter});
        this.props.sortByParameterAndMethod({sortItem: parameter, sortMethod: methodOfSort})
    };

    render() {
        const {total, page} = this.props.pagination;
        const totalPages = [...Array(total).keys()].map(i => ++i);
        const currentPage = parseInt(page);
        return (
            <>
                <h1>All Posts</h1>
                <SortPanel isSorting={this.sortingOfBooks} isActive={this.state.isActive} methodOfSort={this.state.methodOfSort}/>

                {/*{this.state.totalPages ?*/}
                    <PaginationItems currentPage={currentPage}
                                     totalPagesNum={total}
                                     totalPages={totalPages}
                                     onGoToPage={this.onGoToPage}/>
                {/*: ''*/}
                {/*}*/}

                {this.props.books ?
                    this.props.books.map((book) => (
                        <div key={book.id}>
                            <BookItem key={book.id} book={book} showLinkToBook={true}/>
                        </div>))
                    : ''
                }

            </>
        );
    }
}

// Books.propTypes = {
//     books: PropTypes.array.isRequired,
//     pagination: PropTypes.object.isRequired,
// };

const mapStateToProps = (store) => {
    console.log('store', store)
    return {
        books: store.book.books,
        pagination: store.book.pagination
    }
};

const mapDispatchProps = (dispatch) => {
    return {
        getBooks: ({page, per_page}) => dispatch(getBooks({page, per_page})),
        sortByParameterAndMethod: (posts, param, method) => dispatch(sortByParameterAndMethod(posts, param, method)),
    }
};

export default connect(mapStateToProps, mapDispatchProps)(Books);