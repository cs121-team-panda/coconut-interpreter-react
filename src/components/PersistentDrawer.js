// @flow

import * as React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import GearIcon from 'material-ui-icons/Settings';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import PlayArrow from 'material-ui-icons/PlayArrow';
import SaveIcon from 'material-ui-icons/Save';
import AceEditor from 'react-ace';
import type { Theme } from 'material-ui/styles';

import { editorHeaderColor, headerTextStyle } from '../constants';
import type { Args } from '../store/environment/actions';

const drawerWidth = 240;

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  headerText: {
    flex: 1,
    ...headerTextStyle,
  },
  appFrame: {
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    width: '100%',
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: editorHeaderColor,
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: 'none',
  },
  // $FlowFixMe: Cannot assign computed property using object literal
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    minHeight: '48px !important',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
    marginTop: '48px',
    height: `calc(100% - 48)px`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth - 5,
  },
  // $FlowFixMe: Cannot assign computed property using object literal
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  runButton: {
    ...headerTextStyle,
  },
  toolbarRoot: {
    minHeight: 48,
    padding: '0 24px',
  },
  gearIcon: {
    fontSize: 21,
  },
  downloadButton: {
    margin: 0,
    ...headerTextStyle,
  },
});

const optionKeyLabels = {
  target: 'Target Python version',
};

const optionKeys = ['target'];

const options = {
  target: [
    'target',
    'Latest version (Default)',
    'Python 2.6',
    'Python 2.7',
    'Python 3.2',
    'Python 3.3',
    'Python 3.5',
    'Python 3.6',
  ],
};

const values = {
  target: ['sys', '26', '27', '32', '33', '35', '36'],
};

type Props = {
  aceEditor: React.Element<typeof AceEditor>,
  handleClick: (args: Args) => void,
  loading: boolean,
  classes: $Call<typeof styles, Theme>,
};

type State = {
  open: boolean,
  anchor: string,
  anchorEl: { target: ?string },
  selectedIndex: { target: number },
  args: Args,
};

class PersistentDrawer extends React.Component<Props, State> {
  state = {
    open: false,
    anchor: 'left',
    anchorEl: {
      target: null,
    },
    selectedIndex: {
      target: 1,
    },
    args: {
      target: 'sys',
    },
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  handleClickListItem = (event, value) => {
    this.setState({
      anchorEl: {
        ...this.state.anchorEl,
        [value]: event.currentTarget,
      },
    });
  };

  handleMenuItemClick = (event, index, value) => {
    this.setState({
      selectedIndex: {
        ...this.state.selectedIndex,
        [value]: index,
      },
      args: {
        ...this.state.args,
        [value]: values[value][index - 1],
      },
      anchorEl: {
        ...this.state.anchorEl,
        [value]: null,
      },
    });
  };

  handleClose = (event, value) => {
    this.setState({
      anchorEl: {
        ...this.state.anchorEl,
        [value]: null,
      },
    });
  };

  handleDownloadClick = code => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'coconut.coco';
    if (document.body) document.body.appendChild(element);
    element.click();

    // Timeout to prevent the element being removed too soon in some browsers like Firefox
    setTimeout(() => {
      if (document.body) document.body.removeChild(element);
      window.URL.revokeObjectURL(element.href);
    }, 100);
  };

  render() {
    const { classes } = this.props;
    const { anchor, open, anchorEl } = this.state;

    const drawer = (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div>
          <List component="nav">
            {optionKeys.map(option => (
              <ListItem
                key={option}
                button
                aria-haspopup="true"
                aria-controls={option}
                aria-label={optionKeyLabels[option]}
                onClick={event => this.handleClickListItem(event, option)}
              >
                <ListItemText
                  primary={optionKeyLabels[option]}
                  secondary={options[option][this.state.selectedIndex[option]]}
                />
              </ListItem>
            ))}
          </List>
          {optionKeys.map(option => (
            <Menu
              key={option}
              id={option}
              anchorEl={anchorEl[option]}
              open={Boolean(anchorEl[option])}
              onClose={event => this.handleClose(event, option)}
            >
              {options[option].map((option2, index) => (
                <MenuItem
                  key={option2}
                  disabled={index === 0}
                  selected={index === this.state.selectedIndex[option]}
                  onClick={event =>
                    this.handleMenuItemClick(event, index, option)
                  }
                >
                  {option2}
                </MenuItem>
              ))}
            </Menu>
          ))}
        </div>
        <Divider />
      </Drawer>
    );

    let before = null;

    if (anchor === 'left') {
      before = drawer;
    }

    const coconutCode = this.props.aceEditor.props.value;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}
          >
            <Toolbar
              disableGutters={!open}
              classes={{ root: classes.toolbarRoot }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <GearIcon className={classes.gearIcon} />
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                className={classes.headerText}
                noWrap
              >
                Coconut Editor
              </Typography>
              <IconButton
                color="inherit"
                className={classes.downloadButton}
                onClick={() => this.handleDownloadClick(coconutCode)}
              >
                <SaveIcon />
              </IconButton>
              <Button
                color="inherit"
                className={classes.runButton}
                onClick={() => this.props.handleClick(this.state.args)}
                disabled={this.props.loading}
              >
                Run
                <PlayArrow />
              </Button>
            </Toolbar>
          </AppBar>
          {before}
          <main
            className={classNames(
              classes.content,
              classes[`content-${anchor}`],
              {
                [classes.contentShift]: open,
                [classes[`contentShift-${anchor}`]]: open,
              }
            )}
          >
            {this.props.aceEditor}
          </main>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PersistentDrawer);
