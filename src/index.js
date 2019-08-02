import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
// import reducer from './reducers/reducers';
import { BrowserRouter, Route } from 'react-router-dom';

import PostForm from "./containers/AddBook/Book";
import LoginPage from "./containers/Login/Login";
import PostById from "./containers/Book/Book";

import NavbarHeader from './components/Header/Navbar';
import { rootReducer } from './reducers'
import { PrivateRoute } from './routes/PrivateRouter';

import logger from 'redux-logger'
import { createBrowserHistory } from "history";
import { Container } from "react-bootstrap";

const customHistory = createBrowserHistory();
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

const Root =
    <Provider store={store}>
        <Container>
            <BrowserRouter istory={customHistory}>
                <NavbarHeader/>
                <PrivateRoute exact path="/" component={App}/>
                <Route path="/login" component={LoginPage}/>
                <PrivateRoute path="/post/:id" component={PostById}/>
                <PrivateRoute exact path="/post" component={PostForm}/>
            </BrowserRouter>
        </Container>
    </Provider>

ReactDOM.render(
    Root
    , document.getElementById('root')
);