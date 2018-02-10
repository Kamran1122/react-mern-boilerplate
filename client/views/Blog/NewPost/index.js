import React from 'react';
import * as R from 'ramda';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { createPost } from '../../../api';
import InputField from '../../../components/Form/InputField';
import { Col, Row } from 'react-flexbox-grids';
import EditorField, { serializeEditorState } from '../../../components/Form/EditorField';
import BlogWrapper from '../components/BlogWrapper';

// - [x] Api call
// - [ ] Async errors
// - [ ] Sync errors
// - [ ] Route on save
// - [ ] initial values
const NewPost = props => {
  const { handleSubmit, onSubmit } = props;

  return (
    <BlogWrapper>
      <Row>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Col xs={12}>
            <label>Title</label>
            <InputField
              name="title"
              type="text"
            />
          </Col>

          <Col xs={12}>
            <label>Content</label>
            <EditorField
              name="content"
            />
          </Col>

          <Col xs={12}>
            <label>Status</label>
            <InputField
              name="status"
              type="text"
            />
          </Col>

          <Col xs={12}>
            <label>Category</label>
            <InputField
              name="category"
              type="text"
            />
          </Col>

          <Col xs={12}>
            <input
              value="submit"
              type="submit"
            />
          </Col>
          <Link to="/posts">Post</Link>
        </form>
      </Row>
    </BlogWrapper>
  );
};

const handleSubmitSuccess = ({ data }, dispatch, { history }) => {
  console.log('Post saved');
  history.push(`/posts/edit/${data._id}`);
};

const handleSubmitFail = (payload, dispatch, props) => {
  console.log('Post did not save');
  // dispatch a toast action maybe?
};

const onSubmit = values => {
  const stringifiedContentState = serializeEditorState(values.content);
  const newValues = { ...values, ...{ content: stringifiedContentState } };

  return createPost(newValues);
};

const formOptions = {
  form: 'new-post',
  onSubmitSuccess: handleSubmitSuccess,
  onSubmitFail: handleSubmitFail,
  onSubmit: onSubmit,
  initialValues: {
    title: 'My Post',
    status: 'draft',
    category: 'react',
  }
};

export default R.compose(
  reduxForm(formOptions)
)(NewPost);
