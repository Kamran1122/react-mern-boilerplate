import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { refreshToken } from '../../api';
import { actions as userActions } from '../../reducers/user';
import { actions as authActions } from '../../reducers/auth';

class RefreshToken extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

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
          history.push(referrer);
        })
        .catch(err => {
          console.log(err, 'error removing token');
          localStorage.removeItem('token');
          userLogin();
          unauthUser();
        });
    }
  }

  render() {
    return null;
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