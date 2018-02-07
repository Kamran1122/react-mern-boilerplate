import React from 'react';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import InputField from '../../components/InputField';
import { resetPassword } from '../../api';
import { validateResetPassword } from '../../utils/form/validation';
import { actions as userActions } from '../../reducers/user';
import { actions as authActions } from '../../reducers/auth';

// [ ] initial values
// [ ] validation
// [ ] sync errors
// [ ] api call
// [ ] async errors
// [ ] routing

const ForgetPassword = props => {
  const { handleSubmit, onSubmit, match } = props;
  const { token } = match.params;

  // [x] Send the password along with the token
  // [ ] If the token the response is ok reset the password.
  // [ ] set the new token.
  // [ ] and login the user.

  const _onSubmit = props => onSubmit({ ...props, token });

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <div>
        <label>Password:</label>
        <InputField
          name="password"
          type="password"
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <InputField
          name="confirmPassword"
          type="password"
        />
      </div>
      <input type="submit" />
    </form>
  );
};

const handleOnSubmitSuccess = (payload, dispatch, { history }) => {
  localStorage.setItem('token', payload.data.token);
  dispatch(userActions.userLogin(payload.data));
  dispatch(authActions.authUser());
  history.push('/');
};

export default withRouter(reduxForm({
  form: 'resetPassword',
  onSubmit: resetPassword,
  validate: validateResetPassword,
  onSubmitSuccess: handleOnSubmitSuccess,
  initialValues: {
    password: '',
    confirmPassword: '',
  }
})(ForgetPassword));
