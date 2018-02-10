import React, { Component } from 'react';
import { Editor as DraftJsEditor, EditorState } from 'draft-js';

class Editor extends Component {
  static defaultProps = {
    editorState: EditorState.createEmpty()
  };

  constructor(props) {
    super(props);
    this.state = {
      editorState: props.editorState,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      editorState: nextProps.editorState,
    })
  };

  updateEditorState = editorState => {
    const onChange = typeof this.props.onChange === 'function'
      ? () => this.props.onChange(editorState)
      : null;

    this.setState({ editorState }, onChange);
  };

  render() {
    return (
      <DraftJsEditor
        editorState={this.state.editorState}
        onChange={this.updateEditorState}
        onBlur={this.updateEditorState}
        readOnly={this.props.readOnly}
      />
    );
  }
}

export default Editor;