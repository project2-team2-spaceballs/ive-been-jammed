import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";

const LogHistory = (props) => {
    let history;
    if (props.history.length === 0) {
        history = (
            <ListItem>
                <ListItemText primary="No items found" />
            </ListItem>
        );
    } else {
        history = props.history.map((history) => {
            return (
                <ListItem>
                    <ListItemText
                        primary={history.details}
                        secondary={history.updated_dtg}
                    />
                </ListItem>
            );
        });
    }
    return (
        <div>
            <h3>Change History</h3>
            <List>{history}</List>
        </div>
    );
};

export default LogHistory;
