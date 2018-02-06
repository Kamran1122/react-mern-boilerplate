import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ authenticated, name, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      const to = { pathname: '/login', state: { from: props.location } };
      return authenticated
        ? <Component {...props} />
        : <Redirect to={to} />;
    }}
    />
  );
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

AuthRoute.propTypes = {
  authenticated: false,
};

AuthRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(AuthRoute);
