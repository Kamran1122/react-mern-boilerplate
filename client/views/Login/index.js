import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { login } from '../../api';
import InputField from '../../components/InputField';
import { validateLogin } from '../../utils/form/validation';
import withOnLoginSuccess from '../../hoc/withOnLoginSuccess';

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

const mapStateToProps = state => ({ referrer: state.location.referrer });

export default withRouter(
  withOnLoginSuccess(
    connect(mapStateToProps)
    (reduxForm({
      form: 'login',
      onSubmit: login,
      validate: validateLogin,
      initialValues: {
        email: '',
        password: '',
      }
    })(Login))));
