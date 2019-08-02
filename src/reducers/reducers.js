const GET_ALL_BOOKS  = 'GET_ALL_BOOKS';

const initialState = {
    pagination: {
        total: 0
    }
};

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BOOKS:
            return {...state, books: action.data.books, pagination: action.data.pagination};
        case 'GET_BOOK_BY_ID':
            return action.data;
        case 'ADD_POST':
            return ({...state,...action.data});
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