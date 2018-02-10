import React, { Component } from 'react';
import * as R from 'ramda';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'react-flexbox-grids';
import { getPost, updatePost } from '../../../api';
import Editor from '../../../components/Editor';
import {
  deserializeEditorState,
  serializeEditorState
} from '../../../components/Form/EditorField';
import BlogWrapper from '../components/BlogWrapper';

const withPost = (ComponentClass) => {
  return class WithPost extends Component {
    state = {};

    unmounted = false;

    componentWillUnmount() {
      this.unmounted = true;
    }

    componentWillMount() {
      const { postId } = this.props.match.params;
      getPost(postId)
        .then(({ data }) => {
          const editorState = deserializeEditorState(data.content);
          const newData = { ...data, ...{ content: editorState } };
          !this.unmounted && this.setState({ ...newData })
        })
        .catch(err => {
          console.log(err);
        })
    }

    render() {
      const initialValues = this.state.initialValues;
      return (
        <ComponentClass {...this.props} {...this.state} />
      );
    }
  }
};

const EditPost = (props) => {
  return (
    <BlogWrapper>
      <Row>
        <Col xs={12}>
          <Link to="/posts">Post</Link>
        </Col>
        <Col xs={12}>
          <h1>{props.title}</h1>

          <Editor
            editorState={props.content}
            readOnly
          />
        </Col>
      </Row>
    </BlogWrapper>
  );
};

const handleSubmitSuccess = (payload, dispatch, props) => {
  console.log('Post updated');
};

const handleSubmitFail = (payload, dispatch, props) => {
  console.log('Post did not update');
};

const onSubmit = values => {
  const stringifiedContentState = serializeEditorState(values.content);
  const newValues = { ...values, ...{ content: stringifiedContentState } };
  return updatePost(newValues);
};

const formOptions = {
  form: 'edit-post',
  onSubmit: onSubmit,
  onSubmitFail: handleSubmitFail,
  onSubmitSuccess: handleSubmitSuccess,
};

export default R.compose(
  withRouter,
  withPost,
)(EditPost);