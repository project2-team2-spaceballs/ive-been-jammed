import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { FormControl, InputLabel, Input, Tab } from '@material-ui/core';
import {AppBar,Toolbar} from '@material-ui/core'

const useStyles = makeStyles({
    appBar: {
        top: 'auto',
        bottom: 0,
        alignItems: 'center'
      },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SubmitRequest() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, bottom: open });
  };



  return (
    <div>
      
        <React.Fragment>
        <AppBar position="fixed" color="primary"  className={classes.appBar}>
        <Toolbar>
            <Tab onClick={toggleDrawer(true)} label="Submit Request"/>
        </Toolbar>
      </AppBar>

          <Drawer anchor='bottom' open={state.bottom} onClose={toggleDrawer(false)}>
            <FormControl>
                <div>
                <InputLabel htmlFor="mx_id">MX_ID</InputLabel>
                <Input id="mx_id"/>
                </div>
            </FormControl>
            <FormControl>
                <div>
                <InputLabel htmlFor="mx_title">MX Title</InputLabel>
                <Input id="mx_title"/>
                </div>
            </FormControl>
            <FormControl>
                <div>
                <InputLabel htmlFor="sensors">Sensors</InputLabel>
                <Input id="sensors" />
                </div>
            </FormControl>
            <FormControl>
                <div>
                <InputLabel htmlFor="description" />
                <Input id="description" />
                </div>
            </FormControl>
          </Drawer>
        </React.Fragment>
      
    </div>
  );
}