import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {store} from '../store';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const state = store.getState();
        const {user: {currentUser}} = state;
console.log("useruseruseruseruseruser", currentUser)
        if (currentUser.role === 'admin'
            && rest.accessFor === 'admin') {
            return (<Component {...props} />)
        } else if (currentUser.isAuthenticated && rest.accessFor !== 'admin') {
            return (<Component {...props} />)
        } else if (!currentUser.isAuthenticated) {
            return (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
        } else {
            return (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)

        }
    }

    } />
)
//
// import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
//
// import { Route } from 'react-router-dom';
//
// import roleCheck from '../utils/userRoles';
// // import { userRoles } from 'utils/constants';
//
// class ProtectedRoute extends PureComponent {
//   render() {
//     const {
//       path,
//       exact,
//       component,
//       role,
//       redirectAddress
//     } = this.props;
//     console.log("this.props", this.props)
//
//     const wrappedComponent = role
//       ? roleCheck(component, {
//         role,
//         redirectAddress
//       })
//       : component;
// console.log("wrappedComponent", wrappedComponent);
//     return (
//       <Route
//         path={path}
//         exact={exact}
//         component={wrappedComponent}
//       />
//     );
//   }
// }
//
// ProtectedRoute.propTypes = {
//   // Route props
//   path: PropTypes.string,
//   exact: PropTypes.bool,
//   component: PropTypes.any,
//
//   // Protector props
//   role: PropTypes.oneOfType([
//     PropTypes.oneOf([
//       // No user in store
//       'none',
//       // User with any role
//       'any',
//       // ...userRoles            ===
//     ]),
//     PropTypes.arrayOf(
//       // PropTypes.oneOf(userRoles)           ===
//     )
//   ]),
//   redirectAddress: PropTypes.string
// };
//
// ProtectedRoute.defaultProps = {
//   // Route props
//   path: '/',
//   exact: false,
//   component: () => null,
//
//   // Protector props
//   role: undefined,
//   redirectAddress: undefined
// };
//
// export default ProtectedRoute;