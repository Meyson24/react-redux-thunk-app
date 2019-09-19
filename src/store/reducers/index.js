import { combineReducers } from 'redux'
import bookReducer from './book'
import userReducer from './user'
import taskReducer from './task'
import planReducer from './plan'

export const rootReducer = combineReducers({
    book: bookReducer,
    user: userReducer,
    task: taskReducer,
    plan: planReducer,
});