import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { orange } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      float: "right",
      backgroundColor: orange[700],
      '&:hover': {
        backgroundColor: orange[900],
  },
    },
  },
}));

export default function DeleteButton(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton aria-label="delete" onClick={props.click}>
        <DeleteForeverIcon />
      </IconButton>
    </div>
  );
}