import React, { Component } from 'react';
import { Field } from 'redux-form';
import debounce from 'lodash.debounce';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import Editor from '../../Editor';

// The purpose of this component is to map reduxStateToProps
// using redux form.
class EditorFieldContainer extends Component {
  handleOnChange = editorState => {
    const stringifiedContentState = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    this.props.input.onChange(stringifiedContentState)
  };

  // Limit onChange so it does not slow down the app
  onChange = debounce(this.handleOnChange, 500);

  editorState = () => {
    try {
      const value = JSON.parse(this.props.input.value);
      const contentState = convertFromRaw(value);
      return EditorState.createWithContent(contentState)
    } catch (err) {
      return EditorState.createEmpty();
    }
  };

  render() {
    return (
      <Editor
        {...this.props}
        editorState={this.editorState()}
        onChange={this.onChange}
        onBlur={this.onChange}
        readOnly={this.props.readOnly}
      />
    );
  }
}

const EditorField = (props) => {
  return (
    <Field
      component={EditorFieldContainer}
      readOnly={false}
      {...props}
    />
  )
};

export default EditorField;
