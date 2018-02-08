import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actions as userActions } from '../../reducers/user';
import { actions as sessionActions } from '../../reducers/session';

const Logout = props => {
  localStorage.removeItem('token');
  props.resetUser();
  props.unauthUser();
  return <Redirect to="/login" />;
};

const dispatchToProps = {
  resetUser: userActions.reset,
  unauthUser: sessionActions.unauthUser,
};

export default connect(null, dispatchToProps)(Logout);
