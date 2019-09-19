import {
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    CHANGE_SPENT_TIME_TASK_REQUEST,
    CHANGE_SPENT_TIME_TASK_SUCCESS,
    GET_TASK_BY_ID_REQUEST,
    GET_TASK_BY_ID_SUCCESS,
    REQUEST_ERROR,
    UPDATE_TASK_BY_ID_REQUEST,
    UPDATE_TASK_BY_ID_SUCCESS
} from '../../actions/task'

export const initialState = {
    title: '',
    description: '',
    priority: '',
    isLoading: false,
    errorMsg: null,
    refreshSpentTimeTaskId: ''
};

export default function taskReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TASK_REQUEST:
            return {...state, errorMsg: null, isLoading: true};
        case ADD_TASK_SUCCESS:
            return ({...state,...action.data, isLoading: false});
        case GET_TASK_BY_ID_REQUEST:
            return {...state, errorMsg: null, isLoading: true};
        case GET_TASK_BY_ID_SUCCESS:
            return ({...state,...action.data, isLoading: false});
        case UPDATE_TASK_BY_ID_REQUEST:
            return {...state, errorMsg: null, isLoading: true};
        case UPDATE_TASK_BY_ID_SUCCESS:
            return ({...state,...action.data, isLoading: false});
        case DELETE_TASK_REQUEST:
            return {...state, errorMsg: null, isLoading: true};
        case DELETE_TASK_SUCCESS:
            return ({...state,...action.data, isLoading: false});
        case CHANGE_SPENT_TIME_TASK_REQUEST:
            return {...state, errorMsg: null, refreshSpentTimeTaskId: action.data, isLoading: true};
        case CHANGE_SPENT_TIME_TASK_SUCCESS:
            return {...state, ...action.data, refreshSpentTimeTaskId: '', isLoading: false};
        case REQUEST_ERROR:
            return {...state, errorMsg: action.data};
        default:
            return state;
    }
}