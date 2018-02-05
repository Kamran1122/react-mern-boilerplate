import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { validateRegistration } from '../../utils/form/validation';
import { register } from '../../api';
import { actions as userActions } from '../../reducers/user';

// [x] initial values
// [x] validation
// [x] sync errors
// [x] api call
// [x] async errors
// [x] routing
// [x] redux-dispatch action
// [x] token setting
// [ ] Add register link

const Input = ({ input, meta, ...rest }) => {
  const { touched, error } = meta;
  return (
    <div>
      <input
        {...input}
        {...rest}
      />
      {touched && error ? <span>{error}</span> : null}
    </div>
  )
};

const InputField = props => {
  return (
    <Field
      component={Input}
      type="text"
      {...props}
    />
  );
};

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
  history.push('/login');
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
