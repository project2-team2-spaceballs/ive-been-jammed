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

const EditEntry = (props) => {
    const classes = useStyles();
    // const [selectedDate, setSelectedDate] = useState(new Date());
    const [editedText, setEditedText] = useState("");
    // const handleDateChange = (date) => {
    //     setSelectedDate(date);
    //     props.handleChangeDateTime(date);
    // };
    const handleChangeText = (e) => {
        setEditedText(e.target.value);
    }
    const handleEditSubmit = () => {
        props.handleSubmit(props.log_id, editedText);
    }
    return (
        <div className={classes.root}>
            <h3>Edit Entry</h3>
            <div id="popup">
                <form id="log-form" onSubmit={props.handleSubmit}>
                    
                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                    </MuiPickersUtilsProvider> */}
                    <TextField
                        id="details"
                        label="Details"
                        multiline={true}
                        fullWidth={true}
                        value={editedText}
                        onChange={handleChangeText}
                    />
                    <Button variant="contained" onClick={handleEditSubmit}>
                        Edit Entry
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default EditEntry;
