import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import withLogout from '../../hoc/withLogout';
import { refreshToken } from '../../api/index';
import withOnLoginSuccess from '../../hoc/withOnLoginSuccess';
import { actions as sessionActions } from '../../reducers/session';

// The purpose of this file is to refresh the token when the browser refreshes.
const RefreshToken = props => {
  const {
    history,
    referrer,
    logout,
    dispatch,
    onSubmitSuccess,
    initializeSession,
    sessionInitialized,
  } = props;

  if (sessionInitialized) {
    return props.children;
  } else {
    initializeSession();

    if (localStorage.token) {
      refreshToken()
        .then((payload) => {
          onSubmitSuccess(payload, dispatch, { history, referrer });
        })
        .catch(err => {
          // log user out to clear old token
          logout(dispatch)
        });
    }
  }

  return props.children
};

const mapStateToProps = state => ({
  referrer: state.location.referrer,
  sessionInitialized: state.session.sessionInitialized
});

const mapDispatchToProps = (dispatch) => ({
  initializeSession: () => dispatch(sessionActions.initializeSession()),
  dispatch,
});

export default R.compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withLogout,
  withOnLoginSuccess,
)(RefreshToken);