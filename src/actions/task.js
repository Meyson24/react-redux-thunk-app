import {baseAPI} from './../services/api'

export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const GET_TASK_BY_ID_REQUEST = 'GET_TASK_BY_ID_REQUEST';
export const GET_TASK_BY_ID_SUCCESS = 'GET_TASK_BY_ID_SUCCESS';
export const UPDATE_TASK_BY_ID_REQUEST = 'UPDATE_TASK_BY_ID_REQUEST';
export const UPDATE_TASK_BY_ID_SUCCESS = 'UPDATE_TASK_BY_ID_SUCCESS';
export const CHANGE_SPENT_TIME_TASK_REQUEST = 'CHANGE_SPENT_TIME_TASK_REQUEST';
export const CHANGE_SPENT_TIME_TASK_SUCCESS = 'CHANGE_SPENT_TIME_TASK_SUCCESS';
export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';

export const addTask = params => {
    return dispatch => {
        const task = {title: "test", ...params};

        dispatch({type: ADD_TASK_REQUEST});
        return baseAPI.post(`tasks/new`, {...task})
            .then(json => {
                if (json.status === 201) {
                    dispatch({type: ADD_TASK_SUCCESS, data: json.data})
                } else {
                    dispatch({type: REQUEST_ERROR, data: {errorMsg: `Server error`}})
                }
            })
            .catch(err => {
                dispatch(
                    {type: REQUEST_ERROR, data: {errorMsg: err.message}})
            })
    }
};

export const getTaskById = id => {
    return dispatch => {
        dispatch({type: GET_TASK_BY_ID_REQUEST});
        return baseAPI.get(`tasks/${id}`)
            .then(json => {
                if (json.status === 200) {
                    dispatch({type: GET_TASK_BY_ID_SUCCESS, data: json.data})
                } else {
                    dispatch({type: REQUEST_ERROR, data: {errorMsg: `Server error`}})
                }
            })
            .catch(err => dispatch(
                {type: REQUEST_ERROR, data: {errorMsg: err.message}})
            )
    }
};

export const changeSpentTimeOfTasks = params => {
    return dispatch => {
        dispatch({type: CHANGE_SPENT_TIME_TASK_REQUEST, data: params.taskId});
        return baseAPI.put(`/plans/${params.planId}/tasks/${params.taskId}/add-time`, {time: params.time})
            .then(json => {
                if (json.status === 200) {
                    dispatch({type: CHANGE_SPENT_TIME_TASK_SUCCESS, data: json.data[1][0]})
                } else {
                    dispatch({type: REQUEST_ERROR, data: {errorMsg: `Server error`}})
                }
            })
            .catch(err => {
                dispatch(
                    {type: REQUEST_ERROR, data: {errorMsg: err.message}})
            })
    }
};

export const updateTaskById = (taskId, params) => {
    return dispatch => {
        dispatch({type: UPDATE_TASK_BY_ID_REQUEST});
        return baseAPI.put(`/tasks/${taskId}`, {...params})
            .then(json => {
                if (json.status === 200) {
                    dispatch({type: UPDATE_TASK_BY_ID_SUCCESS, data: json.data})
                } else {
                    dispatch({type: REQUEST_ERROR, data: {errorMsg: `Server error`}})
                }
            })
            .catch(err => {
                dispatch(
                    {type: REQUEST_ERROR, data: {errorMsg: err.message}})
            })
    }
};

export const deleteTask = (params) => {
    return dispatch => {
        dispatch({type: DELETE_TASK_REQUEST});
        return baseAPI.delete(`/plans/${params.planId}/tasks/${params.taskId}`)
            .then(json => {
                if (json.status === 200) {
                    dispatch({type: DELETE_TASK_SUCCESS, data: json.data})
                } else {
                    dispatch({type: REQUEST_ERROR, data: {errorMsg: `Server error`}})
                }
            })
            .catch(err => {
                dispatch(
                    {type: REQUEST_ERROR, data: {errorMsg: err.message}})
            })
    }
};