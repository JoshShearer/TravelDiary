import React, { useState, forwardRef } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import {makeStyles} from '@mui/styles';
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
    
  Transition.displayName = "Transition";
  
  const useStyles = makeStyles({
  root: {
    maxWentryIDth: 700,
    backgroundColor: grey[800],
    color: grey[100],
    borderRadius: "10px"
  },
  media: {
    height: 280
  },
  avatar: {
    marginLeft: "auto",
    float: "right!important",
  },
  
  });
  
  
  function NoEntriesModal(props) {  
    const [classicModal, setClassicModal] = useState(true);

    const classes = useStyles();
  
    return (
      <div>
          <Dialog
            classes={{
              root: classes.center,
              paper: classes.modal
            }}
            open={classicModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setClassicModal(false)}
            aria-labelledby="classic-modal-Slide-title"
            aria-describedby="classic-modal-Slide-description"
          >
            <DialogTitle entryID="classic-modal-Slide-title" className={classes.modalHeader}>
              <h4>
                <strong>No Entries Found!</strong>
              </h4>
              <DialogActions>
                <Button
                  onClick={() => setClassicModal(false)}
                  size="large"
                  color="inherit"
                  className={classes.avatar}
                  component={Link}
                  to="/"
                >
                  OK
                </Button>
              </DialogActions>
            </DialogTitle>
          </Dialog>
        )}
      </div>
    );
  }
  
  export default NoEntriesModal;