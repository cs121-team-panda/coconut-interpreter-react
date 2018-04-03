// @flow

import React, { Component } from 'react';
import AceEditor from 'react-ace';
import type { EditorProps } from 'react-ace';

import 'brace/theme/dracula';

import PersistentDrawer from './PersistentDrawer'
import styles from './Editor.module.css';
import errorMarker from '../utils/highlighter';
import { aceStyleProps } from '../constants';
import CoconutMode from '../utils/coconut';

type Props = {
  runRequest: (code: string) => void,
  loading: boolean,
  errorLine: ?number,
  errorCall: ?string,
};

type State = {
  code: string,
};

export default class Editor extends Component<Props, State> {
  state = {
    code: window.initialCode || '',
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

  handleChange = (newCode: string) => {
    this.setState({ code: newCode });
  };

  handleClick = () => {
    if (this.state.code.trim()) this.props.runRequest(this.state.code);
  };

  render() {
    var aceEditor = (<AceEditor
      name="code"
      mode="text"
      theme="dracula"
      value={this.state.code}
      onChange={this.handleChange}
      onLoad={this.onEditorLoad}
      {...aceStyleProps}
      markers={this.getMarkers()}
    />);

    return (
      <div className={styles.editor}>
        <PersistentDrawer aceEditor={aceEditor}/>
      </div>
    );
  }
}
