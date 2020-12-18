import {
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
} from "@material-ui/core";
import React, { useState } from "react";

const LogComments = (props) => {
    const [comment, setComment] = useState("");
    let comments;
    if (props.comments.length === 0) {
        comments = (
            <ListItem>
                <ListItemText primary="No items found" />
            </ListItem>
        );
    } else {
        comments = props.comments.map((comment) => {
            return (
                <ListItem>
                    <ListItemText
                        primary={comment.details}
                        secondary={comment.comment_dtg}
                    />
                </ListItem>
            );
        });
    }

    const handleComment = (e) => {
        setComment(e.target.value);
    };

    const submitComment = () => {
        props.handleSubmit(props.log_id, comment);
        setComment("");
    };

    return (
        <div>
            <h3>Comments</h3>
            <List>{comments}</List>
            <div>
                <TextField
                    id="commentDetails"
                    label="Add a Comment"
                    multiline={true}
                    fullWidth={true}
                    value={comment}
                    onChange={handleComment}
                />
                <Button variant="contained" onClick={submitComment}>
                    Submit Comment
                </Button>
            </div>
        </div>
    );
};

export default LogComments;
