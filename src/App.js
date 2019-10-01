import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { BrowserRouter, Switch, Router,  Route } from 'react-router-dom';
import { Container } from "react-bootstrap";

import {ProtectedRoute} from './routes/ProtectedRoute';

import PostForm from "./containers/Books/CreateBook";
import CreateTask from "./containers/Tasks/CreateTask";
import EditTask from "./containers/Tasks/EditTask";
import LoginPage from "./containers/Login/Login";
import PostById from "./containers/Books/BookById";
import UserById from "./containers/Users/UserById";
import UserProfile from "./containers/Users/UserProfile";
import NavbarHeader from './components/Navbar/Navbar';
import Books from './containers/Books/Books';
import NotFound from './containers/NotFound/NotFound';
import Users from './containers/Users/Users';
import CreatePlan from "./containers/Plan/CreatePlan";

import {checkAuth} from "./actions/user";
import {store, customHistory} from '../src/store'

import './services'

class App extends Component {
   state = {
     isAuthorize: false
   };

  async componentDidMount() {
      await store.dispatch(checkAuth());
      this.setState({isAuthorize:true});
  }

  render() {
     if(!this.state.isAuthorize){return null;}

        return (
            <Provider store={store}>
                <Container>
                    <Router history={customHistory}>
                        <NavbarHeader/>
                        <Switch>
                            <ProtectedRoute exact path="/" component={Books} />
                            <ProtectedRoute exact accessFor={'admin'} path="/users" component={Users}/>
                            <ProtectedRoute exact accessFor={'developer'} path="/users/:id" component={UserProfile}/>
                            <ProtectedRoute exact accessFor={'admin'} path="/users/:id/plan" component={UserById}/>
                            <ProtectedRoute exact accessFor={'admin'} path="/users/:userId/plans/:planId/tasks/new" component={CreateTask}/>
                            <ProtectedRoute exact accessFor={'admin'} path="/users/:userId/plans/:planId/tasks/:taskId/edit" component={EditTask}/>
                            <ProtectedRoute exact accessFor={'admin'} path="/users/:userId/plans/new" component={CreatePlan}/>
                            <Route path="/login"  component={LoginPage}/>
                            <ProtectedRoute path="/post/:id" component={PostById}/>
                            <ProtectedRoute exact path="/post" component={PostForm}/>
                            <Route component={NotFound} />
                        </Switch>
                    </Router>
                </Container>
            </Provider>
        );
    }
}
export default App;