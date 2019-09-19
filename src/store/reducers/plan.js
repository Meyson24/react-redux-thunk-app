import {
    GET_PLAN_BY_ID_REQUEST,
    GET_PLAN_BY_ID_SUCCESS,
    CHANGE_ORDER_PLAN_REQUEST,
    CHANGE_ORDER_PLAN_SUCCESS,
    REQUEST_ERROR,
} from '../../actions/plan'

export const initialState = {
    title: '',
    description: '',
    developers: {},
    tasks: [],
    isLoading: false,
    errorMsg: null,
    isOrdered: false,
};

export default function planReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PLAN_BY_ID_REQUEST:
            return {...state, errorMsg: null, isLoading: true};
        case GET_PLAN_BY_ID_SUCCESS:
            return {...state, ...action.data, isLoading: false};
        case CHANGE_ORDER_PLAN_REQUEST:
            return {...state, isOrdered: false, errorMsg: null, isLoading: true};
        case CHANGE_ORDER_PLAN_SUCCESS:
            return {...state, isOrdered: true, isLoading: false};
        case REQUEST_ERROR:
            return {...state, errorMsg: action.data};

        default:
            return state;
    }
}