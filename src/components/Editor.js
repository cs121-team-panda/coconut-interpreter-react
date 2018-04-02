// @flow

import React, { Component } from 'react';
import AceEditor from 'react-ace';
import type { EditorProps } from 'react-ace';

import 'brace/theme/dracula';

import Header from './Header';
import styles from './Editor.module.css';
import errorMarker from '../utils/highlighter';
import CoconutMode from '../utils/coconut';
import {
  aceStyleProps,
  editorHeaderColor,
  editorHeaderTextColor,
} from '../constants';

type Props = {
  runRequest: (code: string, args: string) => void,
  loading: boolean,
  errorLine: ?number,
  errorCall: ?string,
};

type State = {
  code: string,
  args: string,
};

export default class Editor extends Component<Props, State> {
  state = {
    code: window.initialCode || '',
    args: window.initialArgs || '{}',
  };

  onEditorLoad = (editor: EditorProps) => {
    editor.renderer.setPadding(24);
    // Set editor mode for Coconut-specific syntax highlighting.
    const coconutMode = new CoconutMode();
    editor.getSession().setMode(coconutMode);
  };

  getMarkers = () => {
    const { errorLine, errorCall } = this.props;
    const { code } = this.state;
    return errorMarker(code, errorLine, errorCall, styles.errorMarker);
  };

  handleChange = (newCode: string, newArgs: string) => {
    this.setState({ code: newCode, args: newArgs });
  };

  handleClick = () => {
    if (this.state.code.trim())
      this.props.runRequest(this.state.code, this.state.args);
  };

  render() {
    return (
      <div className={styles.editor}>
        <Header
          name="Coconut Editor"
          color={editorHeaderColor}
          textColor={editorHeaderTextColor}
        >
          <button
            className={styles.headerButton}
            onClick={this.handleClick}
            disabled={this.props.loading}
          >
            Run
          </button>
        </Header>
        <AceEditor
          name="code"
          mode="text"
          theme="dracula"
          value={this.state.code}
          onChange={this.handleChange}
          onLoad={this.onEditorLoad}
          {...aceStyleProps}
          markers={this.getMarkers()}
        />
      </div>
    );
  }
}
