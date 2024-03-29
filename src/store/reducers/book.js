import {
    GET_ALL_BOOKS_REQUEST,
    GET_ALL_BOOKS_SUCCESS,
    GET_BOOK_BY_ID_REQUEST,
    GET_BOOK_BY_ID_SUCCESS,
    ADD_BOOK_REQUEST,
    ADD_BOOK_SUCCESS,
    SORTED_BOOKS_BY_PARAMETER_AND_METHOD,
    REQUEST_ERROR
} from '../../actions/book'

export const initialState = {
    book: {author: {email: ''}},
    books: [],
    pagination: {
        total: 0,
        per_page: 5,
        page: 1,
    },
    isLoading: false,
    errorMsg: null,
};

export default function bookReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_BOOKS_REQUEST:
            return {...state, errorMsg: null, isLoading: true};
        case GET_ALL_BOOKS_SUCCESS:
            return {...state, books: action.data.books, pagination: action.data.pagination, isLoading: false};
        case GET_BOOK_BY_ID_REQUEST:
            return {...state, errorMsg: null, isLoading: true};
        case GET_BOOK_BY_ID_SUCCESS:
            return {...state, book: action.data, isLoading: false};
        case ADD_BOOK_REQUEST:
            return {...state, errorMsg: null, isLoading: true};
        case ADD_BOOK_SUCCESS:
            return ({...state,...action.data, isLoading: false});
        case SORTED_BOOKS_BY_PARAMETER_AND_METHOD:
            return ({...state, errorMsg: null, isLoading: true});
        case REQUEST_ERROR:
            return {...state, errorMsg: action.data};
        default:
            return state;
    }
}