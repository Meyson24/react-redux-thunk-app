import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {store} from '../store';

export const ProtectedRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => {
        const state = store.getState();
        const {user: {currentUser}} = state;

        if (currentUser.role === 'admin'
            && rest.accessFor === 'admin'
            && !rest.loginPage) {
            return (<Component {...props} />)
        } else if (currentUser.isAuthenticated && rest.loginPage) {
            return (<Redirect to={{pathname: '/', state: {from: props.location}}}/>)
        } else if (currentUser.isAuthenticated && rest.accessFor !== 'admin') {
            return (<Component {...props} />)
        } else if (!currentUser.isAuthenticated) {
            return (<Redirect to={{pathname: '/login', state: {from: props.location}}}/>)
        } else {
            return (<Redirect to={{pathname: '/', state: {from: props.location}}}/>)

        }
    }

    }/>
);