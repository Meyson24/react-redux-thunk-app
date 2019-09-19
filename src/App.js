import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from "react-bootstrap";

import {PrivateRoute} from './routes/ProtectedRoute';

import PostForm from "./containers/CreateBook/Book";
import CreateTask from "./containers/CreateTask/CreateTask";
import EditTask from "./containers/EditTask/EditTask";
import LoginPage from "./containers/Login/Login";
import PostById from "./containers/Book/Book";
import UserById from "./containers/User/UserById";
import NavbarHeader from './components/Navbar/Navbar';
import Books from './containers/Books/Books';
import Users from './containers/Users/Users';
import CreatePlan from "./containers/CreatePlan/CreatePlan";

import {checkAuth} from "./actions/user";
import {store, customHistory} from '../src/store/index'

class App extends Component {
   state = {
     isAuthorize: false
   }

  async componentDidMount() {
      await store.dispatch(checkAuth())
      this.setState({isAuthorize:true});
  }

  render() {
     if(!this.state.isAuthorize){return null;}

        return (
            <Provider store={store}>
                <Container>
                    <BrowserRouter history={customHistory}>
                        <NavbarHeader/>
                        <PrivateRoute exact path="/" component={Books} />
                        <PrivateRoute exact accessFor={'admin'} path="/users" component={Users}/>
                        <PrivateRoute exact path="/users/:userId/plans/:planId/tasks/new" component={CreateTask}/>
                        <PrivateRoute exact path="/users/:userId/plans/:planId/tasks/:taskId/edit" component={EditTask}/>
                        <PrivateRoute exact path="/users/:userId/plans/new" component={CreatePlan}/>
                        <Route path="/login" component={LoginPage}/>
                        <PrivateRoute path="/post/:id" component={PostById}/>
                        <PrivateRoute exact path="/users/:id" component={UserById}/>
                        <PrivateRoute exact path="/post" component={PostForm}/>
                    </BrowserRouter>
                </Container>
            </Provider>
        );
    }
}
export default App;