import React from 'react';
import * as R from 'ramda';
import { reduxForm } from 'redux-form';
import InputField from '../../../components/Form/InputField';
import { Col, Row } from 'react-flexbox-grids';

// - [ ] Api call
// - [ ] Async errors
// - [ ] Sync errors
// - [ ] Route on save
// - [ ] initial values
const Subscribe = props => {
  const { handleSubmit, onSubmit } = props;

  return (
    <form
      className="row subscribe-form"
      onSubmit={handleSubmit(onSubmit)}
    >

      <Col xs={12} className="subscribe-form-control">
        <h3 className="text-center subscribe-form-title">
          Subscribe
        </h3>
        <label className="subscribe-form-label">E-mail</label>
        <InputField
          className="subscribe-form-text-input"
          name="email"
          type="email"
        />
      </Col>
      <Col xs={12}>
        <input
          className="subscribe-form-submit-button"
          type="button"
          value="Subscribe"
        />
      </Col>
    </form>
  );
};

const handleSubmitSuccess = ({ data }, dispatch, { history }) => {
  console.log('Subscribed');
  history.push(`/posts/edit/${data._id}`);
};

const handleSubmitFail = (payload, dispatch, props) => {
  console.log('Failed To Subscribe');
  // dispatch a toast action maybe?
};

const onSubmit = values => {
  return Promise.resolve();
};

const formOptions = {
  form: 'subscribe',
  onSubmitSuccess: handleSubmitSuccess,
  onSubmitFail: handleSubmitFail,
  onSubmit: onSubmit,
  initialValues: {
    email: '',
  }
};

export default R.compose(
  reduxForm(formOptions)
)(Subscribe);
