import {baseAPI} from './../services/api'

export const GET_PLAN_BY_ID_REQUEST = 'GET_PLAN_BY_ID_REQUEST';
export const GET_PLAN_BY_ID_SUCCESS = 'GET_PLAN_BY_ID_SUCCESS';
export const CHANGE_ORDER_PLAN_REQUEST = 'CHANGE_ORDER_PLAN_REQUEST';
export const CHANGE_ORDER_PLAN_SUCCESS = 'CHANGE_ORDER_PLAN_SUCCESS';
export const CREATE_PLAN_REQUEST = 'CREATE_PLAN_REQUEST';
export const CREATE_PLAN_SUCCESS = 'CREATE_PLAN_SUCCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';

export const getPlanById = id => {
  return async dispatch => {
      try {
          dispatch({type: GET_PLAN_BY_ID_REQUEST});

          let response = await baseAPI.get(`plans/${id}`);

          if (response.status === 200) {
              dispatch({type: GET_PLAN_BY_ID_SUCCESS, data: response.data})
          }
      } catch (error) {
          dispatch({type: REQUEST_ERROR, data: {errorMsg: error.message}})
      }
  }
};

export const createPlanForUser = (params) => {
  return async dispatch => {
      try {
          dispatch({type: CREATE_PLAN_REQUEST});

          let response = await baseAPI.post(`/plans/new`, {...params});

          if (response.status === 200) {
              dispatch({type: CREATE_PLAN_SUCCESS, data: response.data})
          }
      } catch (error) {
          dispatch({type: REQUEST_ERROR, data: {errorMsg: error.message}})
      }
  }
};

export const changeOrderTasksOfPlan = (planId, tasksOrder) => {
  return async dispatch => {
      try {
          dispatch({type: CHANGE_ORDER_PLAN_REQUEST});

          let response = await baseAPI.put(`/plans/${planId}`, {order: tasksOrder});

          if (response.status === 200) {
              dispatch({type: CHANGE_ORDER_PLAN_SUCCESS, data: response.data})
          }
      } catch (error) {
          dispatch({type: REQUEST_ERROR, data: {errorMsg: error.message}})
      }
  }
};
