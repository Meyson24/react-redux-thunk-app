import reducer, { initialState } from './user'

import {
    AUTH_REQUEST,
    AUTH_REQUEST_SUCCESS,
    AUTH_REQUEST_ERROR,
    LOGOUT,
} from '../../actions/user'

describe('users reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('AUTH_REQUEST after situation without errorMsg', () => {
        const action = {
            type: AUTH_REQUEST,
        };

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: true,
            errorMsg: null,
        })
    });

    it('AUTH_REQUEST after error', () => {
        const initialStateWithError = {
            errorMsg: 'Unknown error',
        };

        const action = {
            type: AUTH_REQUEST,
        };

        expect(reducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            isLoading: true,
            errorMsg: null,
        })
    });

    it('AUTH_REQUEST_SUCCESS', () => {

        const initialState = {
            isAuthenticated: false,
            errorOfAuthenticated: '',
            isLoading: true,
        };

        const action = {
            type: AUTH_REQUEST_SUCCESS,
        };

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: false,
            isAuthenticated: true
        })
    });

    it('AUTH_REQUEST_ERROR', () => {

        const initialState = {
            isAuthenticated: false,
            errorOfAuthenticated: '',
            isLoading: true,
        };

        const action = {
            type: AUTH_REQUEST_ERROR,
            error: {title: 'error', description: 'error'}
        };

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            errorOfAuthenticated: action.error.description,
            errorMsg: action.error.title,
            isLoading: false
        })
    });

    it('LOGOUT', () => {

        const initialState = {
            isAuthenticated: true
        };

        const action = {
            type: LOGOUT,
        };

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isAuthenticated: false
        })
    });
});