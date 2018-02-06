import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { login } from '../../api';
import InputField from '../../components/InputField';
import { validateLogin } from '../../utils/form/validation';
import { actions as userActions } from '../../reducers/user';
import { actions as authActions } from '../../reducers/auth';

// [x] initial values
// [x] validation
// [x] sync errors
// [x] api call
// [x] async errors
// [x] routing
// [x] redux-dispatch action
// [x] token setting
// [x] Add register link

const Login = props => {
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
      <input type="submit" />
      <Link to="/register">Register</Link>
      <Link to="/forget-password">Forget password?</Link>
    </form>
  );
};

const handleOnSubmitSuccess = (payload, dispatch, { history, referrer }) => {
  localStorage.setItem('token', payload.data.token);
  dispatch(userActions.userLogin(payload.data));
  dispatch(authActions.authUser());
  history.push(referrer);
};

const mapStateToProps = state => ({ referrer: state.location.referrer });

export default withRouter(
  connect(mapStateToProps)
  (reduxForm({
    form: 'login',
    onSubmit: login,
    validate: validateLogin,
    onSubmitSuccess: handleOnSubmitSuccess,
    initialValues: {
      email: 'webdeveloper@gmail.com',
      password: '123qweQWE',
      confirmPassword: '123qweQWE',
    }
  })(Login)));
