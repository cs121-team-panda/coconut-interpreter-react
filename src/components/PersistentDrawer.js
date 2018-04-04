import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  appFrame: {
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    width: '100%',
    flexGrow: 1,
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
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
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
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
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
    marginTop: '50px',
    height: `calc(100%)px`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth - 5,
  },
  'content-right': {
    marginRight: -drawerWidth - 5,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
  runButton: {
    right: 0,
    position: 'absolute',
  },
});
const optionKeyLabels = {
  target: 'Allowable Target',
  strict: 'Enforce code cleanliness standards',
  minify: 'Reduce size of Compiled Python',
  line_numbers: 'Show line numbers',
  keep_lines: 'Keep line numbers',
  no_tco: 'No TCO',
};
const optionKeys = [
  'target',
  'strict',
  'minify',
  'line_numbers',
  'keep_lines',
  'no_tco',
];
const options = {
  target: [
    'Allowable Targets',
    'Current latest version (Default)',
    'Python >= 2.6',
    'Python >= 2.7',
    'Python >= 3.2',
    'Python >= 3.3',
    'Python >= 3.5',
    'Python >= 3.6',
  ],
  strict: ['Strict', 'False (Default)', 'True'],
  minify: ['Minify', 'False (Default)', 'True'],
  line_numbers: ['line_numbers', 'False (Default)', 'True'],
  keep_lines: ['keep_lines', 'False (Default)', 'True'],
  no_tco: ['no_tco', 'False (Default)', 'True'],
};

class PersistentDrawer extends React.Component {
  state = {
    open: false,
    anchor: 'left',
    anchorEl: {
      target: null,
      strict: null,
      minify: null,
      line_numbers: null,
      keep_lines: null,
      no_tco: null,
    },
    selectedIndex: {
      target: 1,
      strict: 1,
      minify: 1,
      line_numbers: 1,
      keep_lines: 1,
      no_tco: 1,
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

  render() {
    const { classes, theme } = this.props;
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
          <ListItem>
            <ListItemText primary="Compilation Parameters" />
            <ListItemIcon>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </ListItemIcon>
          </ListItem>
        </div>
        <Divider />
        <div>
          <List component="nav">
            {optionKeys.map(option => (
              <ListItem
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
    let after = null;

    if (anchor === 'left') {
      before = drawer;
    } else {
      after = drawer;
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}
          >
            <Toolbar disableGutters={!open} position="static">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                className={styles.flex}
                noWrap
              >
                Coconut Interpreter
              </Typography>
              <Button color="inherit" className={styles.runButton}>
                Run
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
          {after}
        </div>
      </div>
    );
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  aceEditor: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles, { withTheme: true })(PersistentDrawer);
