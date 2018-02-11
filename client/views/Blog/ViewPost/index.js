import React, { Component } from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'react-flexbox-grids';
import { getPost, updatePost } from '../../../api';
import Editor from '../../../components/Draft';
import {
  deserializeEditorState,
  serializeEditorState
} from '../../../components/Form/EditorField';

const Discuss = () => {
  const install = () => {
    /**
     *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
     *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
    /*
    var disqus_config = function () {
    this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    */
    // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://webdeveloperpr.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  };

  install();
  return (
    <>
      <div id="disqus_thread" />
      <script/>
      <noscript>Please enable JavaScript to view
        the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </>
  )
};

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
      return (
        <ComponentClass {...this.props} {...this.state} />
      );
    }
  }
};

const EditPost = (props) => {
  return (
    <Row>
      <Col xs={12}>
        <h1>{props.title}</h1>
        <Editor
          editorState={props.content}
          readOnly
        />
      </Col>
    </Row>
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