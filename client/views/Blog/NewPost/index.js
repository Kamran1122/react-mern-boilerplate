import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import InputField from '../../../components/InputField';
import { createPost } from '../../../api';

// - [x] Api call
// - [ ] Async errors
// - [ ] Sync errors
// - [ ] Route on save
// - [ ] initial values

const NewPost = (props) => {
  const { handleSubmit, onSubmit } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <InputField
          name="title"
          type="text"
        />
      </div>
      <div>
        <label>content</label>
        <InputField
          name="content"
          type="text"
        />
      </div>
      <div>
        <label>Status</label>
        <InputField
          name="status"
          type="text"
        />
      </div>
      <div>
        <label>Category</label>
        <InputField
          name="category"
          type="text"
        />
      </div>
      <div>
        <input
          value="submit"
          type="submit"
        />
      </div>
      <Link to="/posts">Post</Link>
    </form>
  );
};

const handleSubmitSuccess = (payload, dispatch, props) => {
  console.log('Post saved');
  // dispatch a toast action maybe?
};

const handleSubmitFail = (payload, dispatch, props) => {
  console.log('Post did not save');
  // dispatch a toast action maybe?
};

export default reduxForm({
  form: 'redux-form',
  onSubmitSuccess: handleSubmitSuccess,
  onSubmitFail: handleSubmitFail,
  onSubmit: createPost,
  initialValues: {
    title: 'My Post',
    content: ' This Is My Post!',
    status: 'draft',
    category: 'react',
  }
})(NewPost);