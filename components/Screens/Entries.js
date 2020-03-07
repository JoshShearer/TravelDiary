import React, { useState, forwardRef } from 'react';
import DataContainer from "../EntryContainer/EntryContainer";
import styled from 'styled-components';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import Close from "@material-ui/icons/Close";
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import classNames from "classnames";
import { Link } from "react-router-dom";


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


function Entries(props) {  
  const [classicModal, setClassicModal] = useState(true);

  const classes = useStyles();


  return (
      <div>
          {props.entryData.length ? (
              (props.entryData.map((singleEntry, key) => (
                  <DataContainer data={singleEntry} keyEntry={key} remove={props.remove}/>
              )))
          ) : (
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
            <DialogTitle
              entryID="classic-modal-Slide-title"
              disableTypography
              className={classes.modalHeader}
            >
              <h4 >
                <strong>Make a new entry!</strong>
              </h4>
              <DialogActions>
                <Button
                  onClick={() => setClassicModal(false)}
                  size="large"
                  color="inherit"
                  className={classes.avatar}
                  component={Link}
                  to="/newEntry"
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

export default Entries;