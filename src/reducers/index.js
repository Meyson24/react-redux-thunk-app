import { combineReducers } from 'redux'
import bookReducer from './book'
import { userReducer } from './user'

export const rootReducer = combineReducers({
    book: bookReducer,
    user: userReducer,
});