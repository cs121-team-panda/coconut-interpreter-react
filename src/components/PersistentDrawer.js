import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemText } from 'material-ui/List';
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
  appFrame: {
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    width: '100%',
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
});

const options = {
  target: [
    'Allowable Targets',
    'Current version (sys)',
    'Python >= 2.6',
    'Python >= 2.7',
    'Python >= 3.2',
    'Python >= 3.3',
    'Python >= 3.5',
    'Python >= 3.6',
  ],
  strict: ['Strict', 'False', 'True'],
  minify: ['Minify', 'False', 'True'],
  line_numbers: ['line_numbers', 'False', 'True'],
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
    },
    selectedIndex: {
      target: 1,
      strict: 1,
      minify: 1,
      line_numbers: 1,
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
    console.log('handleClickListItem');
    console.log(this.state);
    this.setState({
      anchorEl: {
        ...this.state.anchorEl,
        [value]: event.currentTarget,
      },
    });
  };

  handleMenuItemClick = (event, index, value) => {
    console.log('handleMenuItemClick');
    console.log(this.state);
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

  handleClose = value => {
    console.log('handleClose');
    console.log(this.state);
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
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <div>
          <List component="nav">
            <ListItem
              button
              aria-haspopup="true"
              aria-controls="target"
              aria-label="Allowable Targets"
              onClick={event => this.handleClickListItem(event, 'target')}
            >
              <ListItemText
                primary="Allowable Targets"
                secondary={options.target[this.state.selectedIndex.target]}
              />
            </ListItem>
            <ListItem
              button
              aria-haspopup="true"
              aria-controls="strict"
              aria-label="Strict"
              onClick={event => this.handleClickListItem(event, 'strict')}
            >
              <ListItemText
                primary="Strict"
                secondary={options.strict[this.state.selectedIndex.strict]}
              />
            </ListItem>
          </List>
          <Menu
            id="lock-menu-target"
            anchorEl={anchorEl.target}
            open={Boolean(anchorEl.target)}
            onClose={this.handleClose}
          >
            {options.target.map((option, index) => (
              <MenuItem
                key={option}
                disabled={index === 0}
                selected={index === this.state.selectedIndex.target}
                onClick={event =>
                  this.handleMenuItemClick(event, index, 'target')
                }
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
          <Menu
            id="lock-menu-strict"
            anchorEl={anchorEl.strict}
            open={Boolean(anchorEl.strict)}
            onClose={this.handleClose}
          >
            {options.strict.map((option, index) => (
              <MenuItem
                key={option}
                disabled={index === 0}
                selected={index === this.state.selectedIndex.strict}
                onClick={event =>
                  this.handleMenuItemClick(event, index, 'strict')
                }
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
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
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                Persistent drawer
              </Typography>
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
