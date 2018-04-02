// @flow

import React, { Component } from 'react';
import AceEditor from 'react-ace';
import type { EditorProps } from 'react-ace';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';

import 'brace/theme/dracula';

import styles from './Editor.module.css';
import errorMarker from '../utils/highlighter';
import CoconutMode from '../utils/coconut';
import { aceStyleProps } from '../constants';

type Props = {
  runRequest: (code: string) => void,
  loading: boolean,
  errorLine: ?number,
  errorCall: ?string,
};

type State = {
  code: string,
  anchor: string,
  open: boolean,
};

const drawerWidth = 240;

const styles2 = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  'appBar-right': {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

export default class Editor extends Component<Props, State> {
  state = {
    code: window.initialCode || '',
    open: false,
    anchor: 'left',
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

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClick = () => {
    if (this.state.code.trim()) this.props.runRequest(this.state.code);
  };

  render() {
    const { anchor, open } = this.state;

    const drawer = (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: styles2.drawerPaper,
        }}
      >
        <div className={styles2.toolbar} />
        <Divider />
        {/* <List>{mailFolderListItems}</List> */}
        <Divider />
        {/* <List>{otherMailFolderListItems}</List> */}
      </Drawer>
    );

    let before = null;

    if (anchor === 'left') {
      before = drawer;
    }

    return (
      <div className={styles.editor}>
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" noWrap>
            Persistent drawer
          </Typography>
        </Toolbar>
        {before}
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
