import React from 'react';
import { reduxForm } from 'redux-form';
import { withRouter, Link } from 'react-router-dom';
import { register } from '../../api';
import InputField from '../../components/InputField';
import { actions as userActions } from '../../reducers/user';
import { actions as authActions } from '../../reducers/auth';
import { validateRegistration } from '../../utils/form/validation';

// [x] initial values
// [x] validation
// [x] sync errors
// [x] api call
// [x] async errors
// [x] routing
// [x] redux-dispatch action
// [x] token setting
// [x] Add register link

const Register = props => {
  const { handleSubmit, onSubmit } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <InputField
          name="email"
          type="text"
        />
      </div>
      <div>
        <label>Password:</label>
        <InputField
          name="password"
          type="password"
        />
      </div>
      <div>
        <label>Confirm password:</label>
        <InputField
          name="confirmPassword"
          type="password"
        />
      </div>
      <input type="submit" />
      <Link to="/login">Login</Link>
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
  form: 'register',
  onSubmit: register,
  validate: validateRegistration,
  onSubmitSuccess: handleOnSubmitSuccess,
  initialValues: {
    email: Math.floor(Math.random() * 101) + 'developer@gmail.com',
    password: '123qwe',
    confirmPassword: '123qwe',
  }
})(Register));
