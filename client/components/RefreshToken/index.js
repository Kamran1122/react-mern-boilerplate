import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { refreshToken } from '../../api/index';
import { actions as userActions } from '../../reducers/user/index';
import { actions as sessionActions } from '../../reducers/session/index';

// The purpose of this file is to refresh the token when the browser refreshes.
class RefreshToken extends Component {
  state = {
    tokenVerified: false,
  };

  componentWillMount() {
    const {
      history,
      authUser,
      referrer,
      userLogin,
      unauthUser
    } = this.props;

    if (localStorage.token) {
      // TODO: [] Move this logic unto a thunk
      refreshToken()
        .then(({ data }) => {
          const { token } = data;
          localStorage.setItem('token', token);
          userLogin(data);
          authUser();
          this.setState({ tokenVerified: true });
          history.push(referrer)
        })
        .catch(err => {
          console.log(err, 'error removing token');
          localStorage.removeItem('token');
          userLogin();
          unauthUser();
          this.setState({ tokenVerified: true });
        });
    } else {
      this.setState({ tokenVerified: true });
    }
  }

  render() {
    return !this.state.tokenVerified
      ? null
      : this.props.children
  }
}

const mapStateToProps = state => ({
  referrer: state.location.referrer
});

const mapDispatchToProps = {
  ...sessionActions,
  ...userActions,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RefreshToken));