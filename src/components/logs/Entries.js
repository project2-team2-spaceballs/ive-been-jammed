import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import LogComments from "./LogComments";
import LogHistory from "./LogHistory"

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "33.33%",
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

const Entries = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel, n) => (event, isExpanded) => {
        props.getComments(n);
        props.getHistory(n);
        setExpanded(isExpanded ? panel : false);
    };



    let n = 0;
    const accordion = props.logEntries.map((entry) => {
        n = entry.id;
        if(entry.archived === true){ return ""; }
        return (
            <Accordion
                expanded={expanded === `panel${n}`}
                onChange={handleChange(`panel${n}`, n)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${n}bh-content1`}
                    id={`panel${n}bh-header`}
                >
                    <Typography className={classes.heading}>
                        {entry.entry_dtg}
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                        {entry.details}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {props.logComments.length > 0 ? <LogComments comments={props.logComments} /> : ""}
                    {props.logHistory.length > 0 ? <LogHistory history={props.logHistory} /> : ""}
                </AccordionDetails>
            </Accordion>
        );
    });

    return <div>{accordion}</div>;
};

export default Entries;
