import axios from "axios";

export const GET_ALL_BOOKS_REQUEST  = 'GET_ALL_BOOKS_REQUEST';
export const GET_ALL_BOOKS_SUCCESS  = 'GET_ALL_BOOKS_SUCCESS';

export const GET_BOOK_BY_ID_REQUEST  = 'GET_BOOK_BY_ID_REQUEST';
export const GET_BOOK_BY_ID_SUCCESS  = 'GET_BOOK_BY_ID_SUCCESS';

export const ADD_BOOK_REQUEST  = 'ADD_BOOK_REQUEST';
export const ADD_BOOK_SUCCESS  = 'ADD_BOOK_SUCCESS';

export const SORTED_BOOKS_BY_PARAMETER_AND_METHOD  = 'SORTED_BOOKS_BY_PARAMETER_AND_METHOD';

export function getAllBooks(books) {

    return {
        type: GET_ALL_BOOKS_SUCCESS,
        data: books
    }
}

export const getBooks = ({page, per_page}) => {
    return dispatch => {
        dispatch({type: GET_ALL_BOOKS_REQUEST});
        return axios.get(
            `http://localhost:4000/books/?page=${page}&per_page=${per_page}`,
            {headers: {'Content-Type': 'application/json'}
            })
            .then(json => {
                if(json.status === 200) {
                    dispatch({type: GET_ALL_BOOKS_SUCCESS, data: json.data})
                } else {
                    dispatch({type: "ERROR", msg: `Server error`})
                }
            })
            .catch(err => dispatch(
                {type: "ERROR", msg: `Server error: ${err}`}))
    }
};

export const getBookById = id => {
    return dispatch => {
        dispatch({type: GET_BOOK_BY_ID_REQUEST});
        return axios.get(
            `http://localhost:4000/books/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(json => {
                console.log('json', json.data);
                if(json.status === 200) {
                    dispatch({type: GET_BOOK_BY_ID_SUCCESS, data: json.data})
                } else {
                    dispatch({type: "ERROR", msg: `Server error`})
                }
            })
            .catch(err => dispatch(
                {type: "ERROR", msg: `Server error: ${err}`}))
    }
};

export const addBook = book => {
    return dispatch => {
        dispatch({type: ADD_BOOK_REQUEST});
        return axios.post('http://localhost:4000/books/new', book,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(json => {
                if (json.status === 201) {
                    dispatch({type: ADD_BOOK_SUCCESS, data: json.data})
                } else {
                    dispatch(
                        {type: "ERROR", msg: "Server Error"})
                }
            })
            .catch(err => {
                dispatch(
                    {type: "ERROR", errorResponse: err.message})
            })
    }
};

export const sortByParameterAndMethod = ({sortItem, sortMethod}) => {
    return (dispatch, getState) => {
        console.log('sortByParameterAndMethod getState', getState())
        const {book} = getState();
                dispatch({type: SORTED_BOOKS_BY_PARAMETER_AND_METHOD});
                return axios.get(
                    `http://localhost:4000/books/?page=${book.pagination.page}&per_page=${book.pagination.per_page}&sortItem=${sortItem}&sortMethod=${sortMethod}`,
                    {headers: {'Content-Type': 'application/json'}
                    })
                    .then(json => {
                        if(json.status === 200) {
                            dispatch({type: GET_ALL_BOOKS_SUCCESS, data: json.data})
                        } else {
                            dispatch({type: "ERROR", msg: `Server error`})
                        }
                    })
                    .catch(err => dispatch(
                        {type: "ERROR", msg: `Server error: ${err}`}))
            }
        };