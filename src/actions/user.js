import {baseAPI} from './../services/api'
import React from "react";

export const CHECK_AUTH_REQUEST = 'CHECK_AUTH_REQUEST';
export const CHECK_AUTH_SUCCESS = 'CHECK_AUTH_SUCCESS';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR';
export const CHECK_AUTH_ERROR = 'CHECK_AUTH_ERROR';
export const GET_ALL_USERS_REQUEST = 'GET_ALL_USERS_REQUEST';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_NEW_TOKENS_REQUEST = 'GET_NEW_TOKENS_REQUEST';
export const GET_NEW_TOKENS_SUCCESS = 'GET_NEW_TOKENS_SUCCESS';
export const GET_USER_BY_ID_REQUEST = 'GET_USER_BY_ID_REQUEST';
export const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS';
export const GET_USER_BY_ID_ERROR = 'GET_USER_BY_ID_ERROR';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';

export const logout = () => {
    return async dispatch => {
        try {
            dispatch({type: LOGOUT_REQUEST});
            let response = await baseAPI.get(`/logout`);

            if (response.status === 200) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('expiresIn');

                dispatch({type: LOGOUT_SUCCESS})
            }
        } catch (error) {
            dispatch({
                type: REQUEST_ERROR,
                error: {title: "Server error.", description: error.message}
            })
        }
    }
};

export const auth = credentials => {
    return async dispatch => {
        try {
            dispatch({type: AUTH_REQUEST});

            let response = await baseAPI.post(`/auth`, credentials);

            if (response.status === 200) {
                if (response.data.accessToken) {
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                    localStorage.setItem('expiresIn', response.data.expiresIn);
                    dispatch({type: AUTH_REQUEST_SUCCESS})
                }
            }
        } catch (error) {
            dispatch({
                type: AUTH_REQUEST_ERROR,
                error: {title: "Please enter valid email or password.", description: error.message}
            })
        }
    }
};

export const getNewPairOfTokens = (refreshToken) => {
    return async dispatch => {
        try {
            dispatch({type: GET_NEW_TOKENS_REQUEST});

            let response = await baseAPI.post(`/auth/token`, {...refreshToken});

            if (response.status === 200) {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                localStorage.setItem('expiresIn', response.data.expiresIn);

                dispatch({type: GET_NEW_TOKENS_SUCCESS, data: response.data})
            }
        } catch (error) {
            dispatch({
                type: REQUEST_ERROR,
                error: {title: "jwt expired.", description: error.message}
            });
        }
    }
};

export const checkAuth = () => {
    return async dispatch => {
        try {
            dispatch({type: CHECK_AUTH_REQUEST});

            let response = await baseAPI.get(`/auth/check`)

            if (response.status === 200) {
                dispatch({type: CHECK_AUTH_SUCCESS, data: response.data})
            }
        } catch (error) {
            console.log('catch error')
            dispatch({
                type: CHECK_AUTH_ERROR,
                error: {title: "Server error.", description: error.message}
            })
        }
    }
};

export const getUsers = () => {
    return async dispatch => {
        try {
            dispatch({type: GET_ALL_USERS_REQUEST});

            let response = await baseAPI.get(`users`);

            if (response.status === 200) {
                dispatch({type: GET_ALL_USERS_SUCCESS, data: response.data})
            } else {
                dispatch({type: REQUEST_ERROR, data: {errorMsg: `Server error`}})
            }
        } catch (error) {
            dispatch({type: REQUEST_ERROR, data: {errorMsg: error.message}})
        }
    }
};

export const getUserById = id => {
    return async dispatch => {
        try {
            dispatch({type: GET_USER_BY_ID_REQUEST});

            let response = await baseAPI.get(`users/${id}`);

            if (response.status === 200) {
                dispatch({type: GET_USER_BY_ID_SUCCESS, data: response.data})
            } else {
                dispatch({type: GET_USER_BY_ID_ERROR, data: {errorMsg: `Server error`}})
            }
        } catch (error) {
            dispatch({type: GET_USER_BY_ID_ERROR, data: {errorMsg: error.message}})
        }
    }
};