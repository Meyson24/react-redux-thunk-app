import thunk from "redux-thunk";
import logger from "redux-logger";

import {applyMiddleware, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from "history";
import {rootReducer} from "./reducers";

export const customHistory = createBrowserHistory();
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));
