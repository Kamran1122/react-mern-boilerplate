import React, { Component } from 'react';
import { Field } from 'redux-form';
import debounce from 'lodash.debounce';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import Editor from '../../Editor';

// The purpose of this component is to map reduxStateToProps
// using redux form.
class EditorFieldContainer extends Component {
  static defaultProps = {
    content: EditorState.createEmpty()
  };

  handleOnChange = editorState => {
    this.props.input.onChange(editorState);
  };

  // Limit onChange so it does not slow down the app
  onChange = debounce(this.handleOnChange, 500);

  render() {
    const value = this.props.input.value;

    const editorState = value instanceof EditorState
      ? value
      : EditorState.createEmpty();

    return (
      <Editor
        {...this.props}
        editorState={editorState}
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

const serializeEditorState = editorState => {
  return JSON.stringify(convertToRaw(editorState.getCurrentContent()));
};

const deserializeEditorState = serializedContentState => {
  try {
    const rawContentState = JSON.parse(serializedContentState);
    const contentState = convertFromRaw(rawContentState);
    return EditorState.createWithContent(contentState)
  } catch (err) {
    return EditorState.createEmpty();
  }
};

export default EditorField;

export {
  serializeEditorState,
  deserializeEditorState
};
