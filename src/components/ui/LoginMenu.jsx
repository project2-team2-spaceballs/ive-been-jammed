import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import {makeStyles} from '@material-ui/styles'
import TypeSelect from './TypeSelect'
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles(() => ({
    textField:{
        borderColor: 'white',
        margin: "7px"
    },
    input: {
        color: 'white',
        borderColor: 'white'
    },
    button: {
        marginLeft: "20px"
    }

})) 

export default function LoginMenu(props){
    const classes=useStyles();
    return(
        <React.Fragment>
            <div marginLeft="auto"><TypeSelect/></div>
            <TextField
                className={classes.textField}
                required
                id="outlined-required"
                label="Username"
                defaultValue="Username"
                variant="outlined"
                color="white"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <AccountCircle />
                        </InputAdornment>
                    ),
                    className: classes.input
                    }}
            />
            <TextField
                className={classes.textField}
                required
                id="outlined-required"
                label="Password"
                defaultValue="Password"
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <LockIcon />
                        </InputAdornment>
                    ),
                    className: classes.input
                }}
            />
            <Button className={classes.button} variant="contained" color="secondary" >Login</Button>
        </React.Fragment>
    )
}