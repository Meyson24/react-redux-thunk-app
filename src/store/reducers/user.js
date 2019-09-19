import {
    AUTH_REQUEST,
    AUTH_REQUEST_SUCCESS,
    AUTH_REQUEST_ERROR,
    LOGOUT,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_REQUEST,
    GET_USER_BY_ID_REQUEST,
    GET_USER_BY_ID_SUCCESS,
    GET_USER_BY_ID_ERROR,
    CHECK_AUTH_REQUEST,
    CHECK_AUTH_SUCCESS
} from '../../actions/user'

export const initialState = {
    users: [],
    currentUser: {
        id: 0,
        email: '',
        first_name: '',
        last_name: '',
        day_of_birthday: '',
        role: '',
        status: '',
        isLoading: false,
        errorOfAuthenticated: '',
        isAuthenticated: false
    },
    userById: {
        id: 0,
        email: '',
        first_name: '',
        last_name: '',
        day_of_birthday: '',
        role: '',
        status: '',
        isLoading: false,
        projects: [{
            id: 0,
            title: '',
            description: ''
        }],
        plan: {
            id: 0,
            title: '',
            description: '',
            user_id: 0,
            order: [],
            tasks: [{
                id: 0,
                title: '',
                description: '',
                taskInfo: {
                    priority: '',
                    status: '',
                    start_time: '',
                    spent_time: ''
                }
            }]
        }
    },
    errorMsg: null
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_REQUEST:
            return {...state, errorMsg: null, isLoading: true};
        case AUTH_REQUEST_SUCCESS:
            return {...state, currentUser: {isAuthenticated: true}, isLoading: false};
        case CHECK_AUTH_REQUEST:
            return {...state, errorMsg: null, currentUser: {isLoading: true}};
        case CHECK_AUTH_SUCCESS:
            return {...state, currentUser: {...action.data, isLoading: false, isAuthenticated: true}};
        case AUTH_REQUEST_ERROR:
            return {...state, currentUser: {errorOfAuthenticated: action.error.title}, errorMsg: action.error.title, isLoading: false};
        case LOGOUT:
            return {...state, currentUser: {...initialState.currentUser}};
        case GET_ALL_USERS_REQUEST:
            return {...state, isLoading: true};
        case GET_ALL_USERS_SUCCESS:
            return {...state, users: action.data, isLoading: false};
        case GET_USER_BY_ID_REQUEST:
            return {...state, errorMsg: null, userById: {isLoading: true}};
        case GET_USER_BY_ID_SUCCESS:
            return {...state, userById: {...action.data, isLoading: false}};
        case GET_USER_BY_ID_ERROR:
            return {...state, user: action.data, isLoading: false};
        default:
            return state;
    }
}