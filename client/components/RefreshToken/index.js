import React, { Component } from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import withLogout from '../../hoc/withLogout';
import { refreshToken } from '../../api/index';
import withOnLoginSuccess from '../../hoc/withOnLoginSuccess';
import throttle from 'lodash.throttle';

import { actions as sessionActions } from '../../reducers/session';

// The purpose of this file is to refresh the token when the browser refreshes.
class RefreshToken extends Component {
  state = {
    loading: false,
  };

  componentWillMount() {
    localStorage.getItem('token') && this.refresh();
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  refresh = () => {
    const {
      history,
      referrer,
      logout,
      dispatch,
      onSubmitSuccess,
    } = this.props;

    return refreshToken()
      .then((payload) => {
        return onSubmitSuccess(payload, dispatch, { history, referrer });
      })
      .catch(err => {
        console.log('err', err);
        return logout(dispatch)
      });
  };

  loading = false;

  handleMouseMove = throttle(() => {
    if (this.props.shouldRefreshToken && this.loading === false) {
      this.loading = true;
      this.refresh().then(() => this.loading = false);
    }
  }, 1000);

  render() {
    return this.props.children;
  };
}

const
  mapStateToProps = state => ({
    referrer: state.location.referrer,
    life: state.session.life,
    expired: state.session.expired,
    shouldRefreshToken: !state.session.expired && (state.session.life < state.session.duration - (60 * 1))
  });

export default R
  .compose(
    withRouter,
    connect(mapStateToProps),
    withLogout,
    withOnLoginSuccess,)
  (RefreshToken);