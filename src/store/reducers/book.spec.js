import reducer, { initialState } from './book'

import {
    GET_ALL_BOOKS_REQUEST,
    GET_ALL_BOOKS_SUCCESS,
    GET_BOOK_BY_ID_REQUEST,
    GET_BOOK_BY_ID_SUCCESS,
    ADD_BOOK_REQUEST,
    ADD_BOOK_SUCCESS,
    SORTED_BOOKS_BY_PARAMETER_AND_METHOD,
    REQUEST_ERROR
} from '../../actions/book'

describe('books reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('GET_ALL_BOOKS_REQUEST after situation without errorMsg', () => {
        const action = {
            type: GET_ALL_BOOKS_REQUEST,
        };

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: true,
            errorMsg: null,
        })
    });

    it('GET_ALL_BOOKS_REQUEST after error', () => {
        const initialStateWithError = {
            books: [],
            errorMsg: 'Unknown error',
        };

        const action = {
            type: GET_ALL_BOOKS_REQUEST,
        };

        expect(reducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            isLoading: true,
            errorMsg: null,
        })
    });

    it('GET_ALL_BOOKS_SUCCESS', () => {

        const initialState = {
            books: [],
            pagination: {
                total: 0,
                per_page: 5,
                page: 1,
            },
            isLoading: true,
        };

        const action = {
            type: GET_ALL_BOOKS_SUCCESS,
            data: {
                books: {something: 'data'},
                pagination: {something: 'data'}
            },
        };

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: false,
            books: action.data.books,
            pagination: action.data.pagination
        })
    });

    it('REQUEST_ERROR', () => {

        const initialState = {
            books: {something: 'data'},
            isLoading: true,
        };

        const action = {
            type: REQUEST_ERROR,
            data: {errorMsg: "error"}
        };

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: true,
            errorMsg: {errorMsg: "error"}
        })
    })

});

describe('book by id reducer', () => {

    it('GET_BOOK_BY_ID_REQUEST after situation without errorMsg', () => {

        const action = {
            type: GET_BOOK_BY_ID_REQUEST,
        };

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: true,
            errorMsg: null,
        })

    });

    it('GET_BOOK_BY_ID_REQUEST after error', () => {
        const initialStateWithError = {
            books: [],
            errorMsg: 'Unknown error',
        };

        const action = {
            type: GET_BOOK_BY_ID_REQUEST,
        };

        expect(reducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            isLoading: true,
            errorMsg: null,
        })
    });

    it('GET_BOOK_BY_ID_SUCCESS', () => {

        const initialState = {
            isLoading: true,
        };

        const action = {
            type: GET_BOOK_BY_ID_SUCCESS,
            data: {something: 'data'},
        };

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: false,
            book: action.data
        })
    });

});

describe('add book reducer', () => {

    it('ADD_BOOK_REQUEST after situation without errorMsg', () => {
        const action = {
            type: ADD_BOOK_REQUEST,
        };

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: true,
            errorMsg: null,
        })
    });


    it('ADD_BOOK_REQUEST after error', () => {
        const initialStateWithError = {
            books: [],
            errorMsg: 'Unknown error',
        };

        const action = {
            type: ADD_BOOK_REQUEST,
        };

        expect(reducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            isLoading: true,
            errorMsg: null,
        })
    });

    it('ADD_BOOK_SUCCESS', () => {

        const initialState = {
            isLoading: true,
        };

        const action = {
            type: ADD_BOOK_SUCCESS,
            data: {
                books: {something: 'data'},
                pagination: {something: 'data'}
            },
        };

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: false,
            books: action.data.books,
            pagination: action.data.pagination
        })
    });

    it('SORTED_BOOKS_BY_PARAMETER_AND_METHOD', () => {

        const initialState = {
            isLoading: false,
        };

        const action = {
            type: SORTED_BOOKS_BY_PARAMETER_AND_METHOD,
        };

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: true,
            errorMsg: null,
        })
    });
});
