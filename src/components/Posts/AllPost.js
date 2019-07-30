import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadBooks, sortByParameterAndMethod } from '../../actions'
import Post from '../Post/Post';
import SortPanel from "./SortPanel";

class AllPost extends Component {
    constructor(props) {
        super(props);

        this.state = {isActive: 'default', methodOfSort: 'asc', id: '', title: '', descriptions: '', price: 0}
    }

    componentDidMount() {
        if (!this.props.books.length) this.props.onLoadBooks()
    }

    sortingOfBooks = (parameter) => {
        const methodOfSort = this.state.methodOfSort === 'asc' ? 'desc' : 'asc';
        this.setState({methodOfSort: methodOfSort, isActive: parameter})
        this.props.sortByParameterAndMethod(this.props.books, parameter, methodOfSort)
    }

    render() {
        return (
            <>
                <h1>All Posts</h1>
                <SortPanel isSorting={this.sortingOfBooks} isActive={this.state.isActive} methodOfSort={this.state.methodOfSort}/>

                {this.props.books.length ?
                    this.props.books.map((book) => (
                        <div key={book.id}>
                            <Post key={book.id} book={book} showLinkToBook={true}/>
                        </div>))
                    : ''
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state
    }
};

const mapDispatchProps = (dispatch) => {
    return {
        onLoadBooks: () => dispatch(loadBooks()),
        sortByParameterAndMethod: (posts, param, method) => dispatch(sortByParameterAndMethod(posts, param, method)),
    }
};

export default connect(mapStateToProps, mapDispatchProps)(AllPost);