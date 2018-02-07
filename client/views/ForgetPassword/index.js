import React from 'react';
import { reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { forgetPassword } from '../../api';
import InputField from '../../components/InputField';
import { validateForgetPassword } from '../../utils/form/validation';

// [x] initial values
// [x] validation
// [x] sync errors
// [x] api call
// [ ] async errors
// [ ] routing

const ForgetPassword = props => {
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
      <input type="submit" />
      <Link to="/login">Login</Link>
    </form>
  );
};

export default withRouter(reduxForm({
  form: 'forgetPassword',
  onSubmit: forgetPassword,
  validate: validateForgetPassword,
  onSubmitSuccess: () => {},
  initialValues: {
    email: 'webdeveloper@gmail.com',
  }
})(ForgetPassword));
