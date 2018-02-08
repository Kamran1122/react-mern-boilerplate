import React, { Component } from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { refreshToken } from '../../api/index';
import withOnLoginSuccess from '../../hoc/withOnLoginSuccess';
import withLogout from '../../hoc/withLogout';

// The purpose of this file is to refresh the token when the browser refreshes.
class RefreshToken extends Component {

  componentWillMount() {
    const {
      history,
      referrer,
      logout,
      dispatch,
      onSubmitSuccess,
    } = this.props;

    if (localStorage.token) {
      // TODO: [] Move this logic unto a thunk
      refreshToken()
        .then((payload) => {
          onSubmitSuccess(payload, dispatch, { history, referrer });
        })
        .catch(err => {
          console.log(err, 'error removing token');
          logout(dispatch);
        });
    } else {
    }
  }

  render() {
    return this.props.children
  }
}

const mapStateToProps = state => ({
  referrer: state.location.referrer
});

export default R.compose(
  withRouter,
  connect(mapStateToProps),
  withLogout,
  withOnLoginSuccess,
)(RefreshToken);