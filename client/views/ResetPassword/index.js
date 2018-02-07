import React from 'react';
import { reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import InputField from '../../components/InputField';
import { validateResetPassword } from '../../utils/form/validation';

// [ ] initial values
// [ ] validation
// [ ] sync errors
// [ ] api call
// [ ] async errors
// [ ] routing

const ForgetPassword = props => {
  const { handleSubmit, onSubmit, match } = props;
  const { token } = match.params;

  // [ ] Send the password along with the token
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

export default withRouter(reduxForm({
  form: 'resetPassword',
  onSubmit: () => console.log('Password reset!'),
  validate: validateResetPassword,
  onSubmitSuccess: () => {
  },
  initialValues: {
    password: '',
    confirmPassword: '',
  }
})(ForgetPassword));
