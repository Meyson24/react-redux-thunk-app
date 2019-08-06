import {
    AUTH_REQUEST,
    AUTH_REQUEST_SUCCESS,
    AUTH_REQUEST_ERROR,
    LOGOUT,
} from '../actions/user'

const isAuthenticated = !!localStorage.getItem('token');

export const initialState = {
    isAuthenticated,
    isLoading: false,
    errorOfAuthenticated: '',
    errorMsg: null
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_REQUEST:
            return {...state, errorMsg: null, isLoading: true};
        case AUTH_REQUEST_SUCCESS:
            return {...state, isAuthenticated: true, isLoading: false};
        case AUTH_REQUEST_ERROR:
            return {...state, errorOfAuthenticated: action.error.description, errorMsg: action.error.title, isLoading: false};
        case LOGOUT:
            return {...state, isAuthenticated: false};
        default:
            return state;
    }
}