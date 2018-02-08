import React from 'react';
import { actions as userActions } from '../../reducers/user';
import { actions as sessionActions } from '../../reducers/session';

const logout = (dispatch) => {
  console.log('fn called');
  localStorage.removeItem('token');
  dispatch(userActions.reset());
  dispatch(sessionActions.unauthUser());
};

// To be used on a redux-form after a successful submit
const withLogout = Component => (props) => {
  return (
    <Component
      {...props}
      logout={() => logout(props.dispatch)}
    />
  );
};

export default withLogout;

export {
  logout,
};
