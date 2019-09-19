import React from 'react';
import { Redirect } from 'react-router-dom';
import _get from 'lodash/get';
import { connect } from 'react-redux';

const connectFunction = connect(
  ({ user: { user } }) => ({
    user
  })
);

/**
 * @param {*} Page
 *
 *
 * Optopns:
 * @param {*} role
 * "none" – for logout user,
 * "any" – for user with any role,
 * any of valid user role value
 * or array woth valid user roles
 * @param {*} withNotActiveStatus bool value.
 * "true" if you need to giva access for user with not "active" status
 * @param {*} redirectAddress in case of validation fail
 */
const roleCheck = (Page, options) => connectFunction((props) => {
  const {
    role,
    redirectAddress = '/'
  } = options;

  const roleRegExp = new RegExp(`^${Array.isArray(role) ? role.join('$|^') : role}$`);

  const userRole = _get(props.user, 'role', 'none');

  const isRoleAccepted = roleRegExp.test(userRole) || (role === 'any' && userRole !== 'none');

  if (!isRoleAccepted) {
    return <Redirect to={redirectAddress} />;
  }

  return <Page {...props} />;
});

export default roleCheck;