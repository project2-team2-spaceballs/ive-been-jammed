import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NestedCardTest from './NestedCardTest';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import ReplyIcon from '@material-ui/icons/Reply';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: red[500],
  }
});

export default function CardTest() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            N
          </Avatar>
        }
        title="Posted by:"
        subheader=" Username"
        style={{backgroundColor:'#648dae'}}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          Here is a long test comment.
        </Typography>
        <CardActions>
        <Button size="small" variant="outlined" startIcon={<ReplyIcon/>}>Reply</Button>
      </CardActions>
        <NestedCardTest />
      </CardContent>

    </Card>
  );
}