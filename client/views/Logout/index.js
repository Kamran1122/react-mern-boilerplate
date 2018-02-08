import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withLogout from '../../hoc/withLogout';

const Logout = props => {
  props.logout();
  return <Redirect to="/login" />;
};

export default R.compose(
  connect(null, null),
  withLogout
)(Logout);

