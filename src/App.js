import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import logger from 'redux-logger'
import { Container } from "react-bootstrap";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";

import { rootReducer } from './reducers'
import { PrivateRoute } from './routes/PrivateRouter';

import PostForm from "./containers/AddBook/Book";
import LoginPage from "./containers/Login/Login";
import PostById from "./containers/Book/Book";
import NavbarHeader from './components/Header/Navbar';
import Books from './containers/Books/Books';

const customHistory = createBrowserHistory();
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Container>
                    <BrowserRouter istory={customHistory}>
                        <NavbarHeader/>
                        <PrivateRoute exact path="/" component={Books}/>
                        <Route path="/login" component={LoginPage}/>
                        <PrivateRoute path="/post/:id" component={PostById}/>
                        <PrivateRoute exact path="/post" component={PostForm}/>
                    </BrowserRouter>
                </Container>
            </Provider>
        );
    }
}
export default App;