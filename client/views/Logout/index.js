import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actions as userActions } from '../../reducers/user';
import { actions as authActions } from '../../reducers/auth';

// - [x] reset the user
// - [x] cancel the token
// - [x] route user back to /login
const Logout = props => {
  localStorage.removeItem('token');
  props.resetUser();
  props.unauthUser();
  return <Redirect to="/login" />;
};

const dispatchToProps = {
  resetUser: userActions.reset,
  unauthUser: authActions.unauthUser,
};

export default connect(null, dispatchToProps)(Logout);
