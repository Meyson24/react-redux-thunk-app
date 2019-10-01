import {baseAPI} from './../services/api'

export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const GET_TASK_BY_ID_REQUEST = 'GET_TASK_BY_ID_REQUEST';
export const GET_TASK_BY_ID_SUCCESS = 'GET_TASK_BY_ID_SUCCESS';
export const GET_TASKS_REQUEST = 'GET_TASKS_REQUEST';
export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
export const UPDATE_TASK_BY_ID_REQUEST = 'UPDATE_TASK_BY_ID_REQUEST';
export const UPDATE_TASK_BY_ID_SUCCESS = 'UPDATE_TASK_BY_ID_SUCCESS';
export const CHANGE_SPENT_TIME_TASK_REQUEST = 'CHANGE_SPENT_TIME_TASK_REQUEST';
export const CHANGE_SPENT_TIME_TASK_SUCCESS = 'CHANGE_SPENT_TIME_TASK_SUCCESS';
export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';

export const addTask = params => {
    return async dispatch => {
        try {
            dispatch({type: ADD_TASK_REQUEST});

            let response = await baseAPI.post(`tasks/new`, {...params});

            if (response.status === 201) {
                dispatch({type: ADD_TASK_SUCCESS, data: response.data})
            }
        } catch (error) {
            dispatch({type: REQUEST_ERROR, data: {errorMsg: error.message}})
        }
    }
};

export const getTaskById = id => {
    return async dispatch => {
        try {
            dispatch({type: GET_TASK_BY_ID_REQUEST});

            let response = await baseAPI.get(`tasks/${id}`);

            if (response.status === 200) {
                dispatch({type: GET_TASK_BY_ID_SUCCESS, data: response.data})
            }
        } catch (error) {
            dispatch({type: REQUEST_ERROR, data: {errorMsg: error.message}})
        }
    }
};

export const getTasks = () => {
    return async dispatch => {
        try {
            dispatch({type: GET_TASKS_REQUEST});

            let response = await baseAPI.get(`tasks`);

            if (response.status === 200) {
                dispatch({type: GET_TASKS_SUCCESS, data: response.data})
            }
        } catch (error) {
            dispatch({type: REQUEST_ERROR, data: {errorMsg: error.message}})
        }
    }
};

export const changeSpentTimeOfTasks = params => {
    return async dispatch => {
        try {
            dispatch({type: CHANGE_SPENT_TIME_TASK_REQUEST, data: params.taskId});

            let response = await baseAPI.put(`/plans/${params.planId}/tasks/${params.taskId}/add-time`,
                {time: params.time});

            if (response.status === 200) {
                dispatch({type: CHANGE_SPENT_TIME_TASK_SUCCESS, data: response.data[1][0]})
            }
        } catch (error) {
            dispatch({type: REQUEST_ERROR, data: {errorMsg: error.message}})
        }
    }
};

export const updateTaskById = (taskId, params) => {
    return async dispatch => {
        try {
            dispatch({type: UPDATE_TASK_BY_ID_REQUEST});

            let response = await baseAPI.put(`/tasks/${taskId}`, {...params});

            if (response.status === 200) {
                dispatch({type: UPDATE_TASK_BY_ID_SUCCESS, data: response.data})
            }
        } catch (error) {
            dispatch({type: REQUEST_ERROR, data: {errorMsg: error.message}})
        }
    }
};

export const deleteTask = (params) => {
    return async dispatch => {
        try {
            dispatch({type: DELETE_TASK_REQUEST});

            let response = await baseAPI.delete(`/plans/${params.planId}/tasks/${params.taskId}`);

            if (response.status === 200) {
                dispatch({type: DELETE_TASK_SUCCESS, data: response.data})
            }
        } catch (error) {
            dispatch({type: REQUEST_ERROR, data: {errorMsg: error.message}})
        }
    }
};