const reducers = (state = [], action) => {
    switch (action.type) {
        case 'ALL_BOOKS':
            return action.data;
        case 'ADD_POST':
            return state.concat([action.data]);
        case 'AUTH_SUCCESS':
            return {redirectToReferrer: true};
        case 'ERROR':
            return {errorResponse: action.errorResponse};
        case 'AUTH_ERROR':
            return {...state, error: action.error, redirectToReferrer: false};
        case 'SORT_BY_PARAMETER':
            return  action.posts;
        case 'LOGOUT':
            return {...state, isAuthorized: false};
        default:
            return state;
    }
};
export default reducers;