import React, { Component } from 'react';
import * as R from 'ramda';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { getPost, updatePost } from '../../../api';
import InputField from '../../../components/Form/InputField';
import EditorField from '../../../components/Form/EditorField';

// - [x] Api call
// - [x] initial async values
// - [ ] Sync errors
// - [ ] Async errors
// - [ ] Route on save
const withPost = (ComponentClass) => {
  return class WithPost extends Component {
    state = {
      initialValues: null,
    };

    unmounted = false;

    componentWillUnmount() {
      this.unmounted = true;
    }

    componentWillMount() {
      const { postId } = this.props.match.params;
      getPost(postId)
        .then(({ data }) => {
          !this.unmounted && this.setState({ initialValues: data, })
        })
        .catch(err => {
          console.log(err);
        })
    }

    render() {
      const initialValues = this.state.initialValues;
      return (
        <ComponentClass {...this.props} initialValues={initialValues} />
      );
    }
  }
};

const EditPost = (props) => {
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
          value="Update"
          type="submit"
        />
      </div>
      <Link to="/posts">Post</Link>
    </form>
  );
};

const handleSubmitSuccess = (payload, dispatch, props) => {
  console.log('Post updated');
};

const handleSubmitFail = (payload, dispatch, props) => {
  console.log('Post did not update');
  // dispatch a toast action maybe?
};

const formOptions = {
  form: 'edit-post',
  onSubmit: updatePost,
  onSubmitFail: handleSubmitFail,
  onSubmitSuccess: handleSubmitSuccess,
};

export default R.compose(
  withRouter,
  withPost,
  reduxForm(formOptions)
)(EditPost);