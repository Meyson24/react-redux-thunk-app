const postReducer = (state = [], action) => {
    switch (action.type) {
        case 'ALL_POSTS':
            console.log('state action ==', state, action)
            return action.data;
            // return state.concat(action.data);
        case 'ADD_POST':
            console.log('action state add post ', state)
            return state.concat([action.data]);
        case 'AUTH_SUCCESS':
            // console.log('action state AUTH_SUCCESS', action.data)
            // return {user: action.data, loading: false, redirectToReferrer: true};
            return {...state, redirectToReferrer: true};
        case 'ERROR':
            return action.msg;
        case 'AUTH_ERROR':
            return {...state, error: action.error, redirectToReferrer: false};
        case 'SORT_BY_PARAMETER':
            // console.log('state action SORT_BY_PARAMETER', state, action)
            return  action.posts;
        case 'LOGOUT':
            return {...state, isAuthorized: false};
        default:
            return state;
    }
}
export default postReducer;