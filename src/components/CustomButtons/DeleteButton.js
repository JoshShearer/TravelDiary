import React from 'react';
import {makeStyles} from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      // margin: theme.spacing(1),
      float: "right",
      // backgroundColor: grey[200],
      // '&:hover': {
      //   backgroundColor: grey[700],
  // },
    },
  },
}));

export default function DeleteButton(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton aria-label="delete" onClick={props.del} size="large">
        <DeleteForeverIcon />
      </IconButton>
    </div>
  );
}