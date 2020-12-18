import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";

const LogHistory = (props) => {
    const history = props.history.map((history) => {
        return (
            <ListItem>
                <ListItemText
                    primary={history.details}
                    secondary={history.updated_dtg}
                />
            </ListItem>
        );
    });

    return (
        <div>
            <List>{history}</List>
        </div>
    );
};

export default LogHistory;
