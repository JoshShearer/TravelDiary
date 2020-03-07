import React, { forwardRef, useState } from 'react';
import MapContainer from "../Map/GPSCollection";
import DeleteButton from "../CustomButtons/DeleteButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
// import CurrentLocation from "./Map";
import "./EntryContainer.css"

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

export default function DataContainer (props) {

  const [classicModal, setClassicModal] = useState(false);
  const [, setEntryID] = useState();

  function removalModalHandler(entryID){
    setClassicModal(true);
    setEntryID(entryID);
  };

  function deleteEntry(entryID){
    props.remove(entryID)
    setClassicModal(false)
  }

  const classes = useStyles();

    const mapStyles = {width: '25%', 
                       height: '20%'};
 

    return (
      <div>
        <section>        
            <sidebar>
              <MapContainer   className="mapEntries" 
                              mapSize={mapStyles}  
                              location={props.data.gps} 
                              zoom={10}
                              static='true'/>
            </sidebar>
            <article>
            {/* <ColorButton key={props.keyEntry} onClick={() => console.log(`pressed delete button ${props.keyEntry}`)}/> */}
            <DeleteButton className={classes.avatar}
                          key={props.keyEntry} 
                          click={removalModalHandler}
                          />
              <h4>{props.data.title}</h4>
              <p>{props.data.info}<br/><br/>
                  <br/>Date:{props.data.date}
                  <br/>Time:{props.data.time}
                  <br/>
                </p>
                  {props.data.location !== undefined ?
                    <p>Location:{props.data.location.city}</p>
                    : <p>Error: Trouble Finding Location</p>
                }
            </article>
        </section>
        <div>
          {props.data.images !== undefined ? 
            (props.data.images.map((image) => 
              <input type="file" class="filepond" name="cover" photo={image} imagePreview={true}/>))
              
              : <h1>No Photos Found</h1>
          } 
          <br/>
        </div> 
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
                <strong>Are you sure you want to delete this entry?</strong>
              </h4>
              <DialogActions>
                <Button
                  onClick={() => setClassicModal(false)}
                  size="large"
                  color="inherit"
                  className={classes.avatar}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => deleteEntry(props.data.id)}
                  size="large"
                  color="inherit"
                  simple
                  // component={Link}
                  // to="/entries"
                >
                  Delete
                </Button>
              </DialogActions>
            </DialogTitle>
        </Dialog>
      </div>
    );
  }

//     entryID: Number,
//     title: String,
//     info: String,
//     image: [{type: Buffer}],  
//     imageType: [{type: String}],  
//     date: String,
//     time: String,
//     gps: {  lat: String,


