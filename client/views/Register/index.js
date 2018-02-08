import React from 'react';
import { reduxForm } from 'redux-form';
import { withRouter, Link } from 'react-router-dom';
import { register } from '../../api';
import InputField from '../../components/InputField';
import { validateRegistration } from '../../utils/form/validation';
import withOnLoginSuccess from '../../hoc/withOnLoginSuccess';

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

export default withRouter(withOnLoginSuccess(reduxForm({
  form: 'register',
  onSubmit: register,
  validate: validateRegistration,
  initialValues: {
    email: '',
    password: '',
    confirmPassword: '',
  }
})(Register)));
