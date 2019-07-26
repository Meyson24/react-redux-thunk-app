import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import reducer from './reducers/postReducer';
import {BrowserRouter, Route} from 'react-router-dom';
import PostForm from "./components/AddNewPost/PostForm";
import LoginPage from "./components/Login/LoginPage";
import {PrivateRoute} from './routes/PrivateRouter';
import PostById from "./components/Post/PostById";
import NavbarHeader from './components/Header/Navbar'
import {createBrowserHistory} from "history";
import { Container, Row } from "react-bootstrap";

const customHistory = createBrowserHistory();
const store = createStore(reducer, applyMiddleware(thunk));
const Root =
    <Provider store={store}>
        <NavbarHeader/>
        <Container>
            <Row>
                <BrowserRouter istory={customHistory}>
                    <div>
                        <PrivateRoute exact path="/" component={App}/>
                        <Route path="/login" component={LoginPage}/>
                        {/*<Route exact path="/" component={App}/>*/}
                        <PrivateRoute exact path="/post/:id" component={PostById}/>
                        <PrivateRoute exact path="/post" component={PostForm}/>
                    </div>
                </BrowserRouter>
            </Row>
        </Container>
    </Provider>


ReactDOM.render(
    Root
    , document.getElementById('root')
);