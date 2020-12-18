import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

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
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    let n = 0;
    const accordion = props.logEntries.map((entry) => {
        n++;
        return (
            <Accordion
                expanded={expanded === "panel"+n}
                onChange={handleChange(`panel${n}`)}
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
                    <Typography>
                        Comments and such go here.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        );
    });

    return <div>{accordion}</div>;
};

export default Entries;
