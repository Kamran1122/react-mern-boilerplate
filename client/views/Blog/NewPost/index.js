import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { createPost } from '../../../api';
import InputField from '../../../components/Form/InputField';
import EditorField from '../../../components/Form/EditorField';

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
        <label>Content</label>
        <EditorField
          name="content"
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
  form: 'new-post',
  onSubmitSuccess: handleSubmitSuccess,
  onSubmitFail: handleSubmitFail,
  onSubmit: createPost,
  initialValues: {
    title: 'My Post',
    status: 'draft',
    category: 'react',
  }
})(NewPost);