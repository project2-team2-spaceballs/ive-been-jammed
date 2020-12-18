import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import {
    KeyboardDatePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));

const NewEntry = (props) => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        props.handleChangeDateTime(date);
    };

    return (
        <div className={classes.root}>
            <h3>New Entry</h3>
            <div id="popup">
                <form id="log-form" onSubmit={props.handleSubmit} >
                    <TextField
                        id="details"
                        label="Details"
                        multiline={true}
                        fullWidth={true}
                        value={props.newDetails}
                        onChange={props.handleChangeDetails}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="newDate"
                            name="newDate"
                            label="Event Date"
                            format="yyyy-MM-dd"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                        />
                        <KeyboardTimePicker
                            ampm={false}
                            margin="normal"
                            id="newTime"
                            name="newTime"
                            label="Event Time"
                            format="HH:mm:ss"
                            openTo="hours"
                            views={["hours", "minutes", "seconds"]}
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                "aria-label": "change time",
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <Button variant="contained" onClick={props.handleSubmit} >Submit</Button>
                </form>
            </div>
        </div>
    );
};

export default NewEntry;
