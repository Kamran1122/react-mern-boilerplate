import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { refreshToken } from '../../api/index';
import { actions as userActions } from '../../reducers/user/index';
import { actions as authActions } from '../../reducers/auth/index';

class RefreshToken extends React.Component {
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
      refreshToken()
        .then(({ data }) => {
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
  ...authActions,
  ...userActions,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RefreshToken));