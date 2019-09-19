import {baseAPI} from './../services/api'

export const GET_PLAN_BY_ID_REQUEST = 'GET_PLAN_BY_ID_REQUEST';
export const GET_PLAN_BY_ID_SUCCESS = 'GET_PLAN_BY_ID_SUCCESS';
export const CHANGE_ORDER_PLAN_REQUEST = 'CHANGE_ORDER_PLAN_REQUEST';
export const CHANGE_ORDER_PLAN_SUCCESS = 'CHANGE_ORDER_PLAN_SUCCESS';
export const CREATE_PLAN_REQUEST = 'CREATE_PLAN_REQUEST';
export const CREATE_PLAN_SUCCESS = 'CREATE_PLAN_SUCCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';

export const getPlanById = id => {
  return dispatch => {
    dispatch({type: GET_PLAN_BY_ID_REQUEST});
    return baseAPI.get(`plans/${id}`)
      .then(json => {
        if (json.status === 200) {
          dispatch({type: GET_PLAN_BY_ID_SUCCESS, data: json.data})
        } else {
          dispatch({type: REQUEST_ERROR, data: {errorMsg: `Server error`}})
        }
      })
      .catch(err => dispatch(
        {type: REQUEST_ERROR, data: {errorMsg: err.message}})
      )
  }
};

export const createPlanForUser = (params) => {
  return dispatch => {
    dispatch({type: CREATE_PLAN_REQUEST});
    return baseAPI.post(`/plans/new`, {...params})
      .then(json => {
        if (json.status === 200) {
          dispatch({type: CREATE_PLAN_SUCCESS, data: json.data})
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

export const changeOrderTasksOfPlan = (planId, tasksOrder) => {
  return dispatch => {
    dispatch({type: CHANGE_ORDER_PLAN_REQUEST});
    return baseAPI.put(`/plans/${planId}`, {order: tasksOrder})
      .then(json => {
        if (json.status === 200) {
          dispatch({type: CHANGE_ORDER_PLAN_SUCCESS, data: json.data})
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
