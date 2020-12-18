import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";

const LogComments = (props) => {
    const comments = props.comments.map((comment) => {
        return (
            <ListItem>
                <ListItemText
                    primary={comment.details}
                    secondary={comment.comment_dtg}
                />
            </ListItem>
        );
    });

    return (
        <div>
            <List>{comments}</List>
            <div>
                <p>Add comment box goes here.</p>
            </div>
        </div>
    );
};

export default LogComments;
