import {baseAPI} from './../services/api'

export const GET_ALL_BOOKS_REQUEST = 'GET_ALL_BOOKS_REQUEST';
export const GET_ALL_BOOKS_SUCCESS = 'GET_ALL_BOOKS_SUCCESS';
export const GET_BOOK_BY_ID_REQUEST = 'GET_BOOK_BY_ID_REQUEST';
export const GET_BOOK_BY_ID_SUCCESS = 'GET_BOOK_BY_ID_SUCCESS';
export const ADD_BOOK_REQUEST = 'ADD_BOOK_REQUEST';
export const ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS';
export const SORTED_BOOKS_BY_PARAMETER_AND_METHOD = 'SORTED_BOOKS_BY_PARAMETER_AND_METHOD';
export const REQUEST_ERROR = 'REQUEST_ERROR';

export const getBooks = ({page, per_page}) => {
    return async dispatch => {
        try {
            dispatch({type: GET_ALL_BOOKS_REQUEST});

            let response = await baseAPI.get(`books/?page=${page}&per_page=${per_page}`);

            if (response.status === 200) {
                dispatch({type: GET_ALL_BOOKS_SUCCESS, data: response.data})
            }
        } catch (error) {
            dispatch({type: REQUEST_ERROR, data: {errorMsg: error.message}})
        }
    }
};

export const getBookById = id => {
    return async dispatch => {
        try {
            dispatch({type: GET_BOOK_BY_ID_REQUEST});

            let response = await baseAPI.get(`books/${id}`);

            if (response.status === 200) {
                dispatch({type: GET_BOOK_BY_ID_SUCCESS, data: response.data})
            }
        } catch (error) {
            dispatch({type: REQUEST_ERROR, data: {errorMsg: error.message}})
        }
    }
};

export const addBook = book => {
    return async dispatch => {
        try {
            dispatch({type: ADD_BOOK_REQUEST});

            let response = await baseAPI.post(`books/new`, book)

            if (response.status === 201) {
                dispatch({type: ADD_BOOK_SUCCESS, data: response.data})
            }
        } catch (error) {
            dispatch({type: REQUEST_ERROR, data: {errorMsg: error.message}})
        }
    }
};

export const sortByParameterAndMethod = ({sortItem, sortMethod}) => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: SORTED_BOOKS_BY_PARAMETER_AND_METHOD});

            const {book} = getState();

            let response = await baseAPI.get(
                `books?page=${book.pagination.page}&per_page=${book.pagination.per_page}&sortItem=${sortItem}&sortMethod=${sortMethod}`
            );

            if (response.status === 200) {
                dispatch({type: GET_ALL_BOOKS_SUCCESS, data: response.data})
            }
        } catch (error) {
            dispatch({type: REQUEST_ERROR, data: {errorMsg: error.message, desc: 'action book'}})
        }
    }
};