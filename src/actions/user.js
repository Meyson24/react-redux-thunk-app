import {baseAPI} from './../services/api'

export const CHECK_AUTH_REQUEST = 'CHECK_AUTH_REQUEST';
export const CHECK_AUTH_SUCCESS = 'CHECK_AUTH_SUCCESS';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR';
export const GET_ALL_USERS_REQUEST = 'GET_ALL_USERS_REQUEST';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_USER_BY_ID_REQUEST = 'GET_USER_BY_ID_REQUEST';
export const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS';
export const GET_USER_BY_ID_ERROR = 'GET_USER_BY_ID_ERROR';
export const LOGOUT = 'LOGOUT';
export const REQUEST_ERROR = 'REQUEST_ERROR';

export const logout = () => {
    return async dispatch => {
        await localStorage.removeItem('token');
        dispatch({type: LOGOUT})
    }
};

export const auth = credentials => {
    return dispatch => {
        dispatch({type: AUTH_REQUEST});
        return baseAPI.post(`/auth`, credentials)
            .then(async json => {
                if (json.status === 200) {
                    if (json.data.accessToken) {
                        await localStorage.setItem('token', json.data.accessToken);
                        dispatch({type: "AUTH_REQUEST_SUCCESS"})
                    }
                } else if (json.status === 401) {
                    dispatch(
                        {type: "AUTH_REQUEST_ERROR", error: "Please enter valid email or password."})
                }
            })
            .catch(error => dispatch({
                type: "AUTH_REQUEST_ERROR",
                error: {title: "Please enter valid email or password.", description: error.message}
            }))
    }
};
export const checkAuth = () => {
    return dispatch => {
        dispatch({type: CHECK_AUTH_REQUEST});
        return baseAPI.get(`/check-auth`)
            .then(json => {
                if (json.status === 200) {
                    dispatch({type: CHECK_AUTH_SUCCESS, data: json.data})
                } else if (json.status === 401) {
                    dispatch(
                        {type: REQUEST_ERROR, error: "Please enter valid email or password."})
                }
            })
            .catch(error => dispatch({
                type: REQUEST_ERROR,
                error: {title: "Please enter valid email or password.", description: error.message}
            }))
    }
};

export const getUsers = () => {
    return dispatch => {
        dispatch({type: GET_ALL_USERS_REQUEST});
        return baseAPI.get(`users`)
            .then(json => {
                if (json.status === 200) {
                    dispatch({type: GET_ALL_USERS_SUCCESS, data: json.data})
                } else {
                    dispatch({type: REQUEST_ERROR, data: {errorMsg: `Server error`}})
                }
            })
            .catch(err => dispatch(
                {type: REQUEST_ERROR, data: {errorMsg: err.message}})
            )
    }
};

export const getUserById = id => {
    return dispatch => {
        dispatch({type: GET_USER_BY_ID_REQUEST});
        return baseAPI.get(`users/${id}`)
            .then(json => {
                if (json.status === 200) {
                    dispatch({type: GET_USER_BY_ID_SUCCESS, data: json.data})
                } else {
                    dispatch({type: GET_USER_BY_ID_ERROR, data: {errorMsg: `Server error`}})
                }
            })
            .catch(err => dispatch(
                {type: REQUEST_ERROR, data: {errorMsg: err.message}})
            )
    }
};