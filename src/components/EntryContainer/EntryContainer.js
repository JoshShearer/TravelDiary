import React, { forwardRef, useState } from 'react';
import MapHome from "../MapContainer/MapHome";
import DeleteButton from "../CustomButtons/DeleteButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import ImageHandler from '../ImageHandler/ImageHandler';
import Slide from "@mui/material/Slide";
import {makeStyles} from '@mui/styles';
import { grey } from "@mui/material/colors";
import "./EntryContainer.css"
import isEmpty from 'lodash.isempty';

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
  float: "left!important",
},

});

export default function DataContainer (props) {

  const [classicModal, setClassicModal] = useState(false);


  function removalModalHandler(entryID){
    setClassicModal(true);
    // props.remove(entryID);
  };

  function deleteEntry(entryID){
    props.remove(entryID)
    setClassicModal(false)
  }

  const classes = useStyles();

    const mapStyles = {width: '100%', 
                       height: '100%'};
    
 
 

    return (
      <div>
        <section>        
            <sidebar>
              <MapHome   className="mapEntries" 
                              mapSize={mapStyles}  
                              location={props.data.gps} 
                              zoom={8}
                              static='true'/>
            </sidebar>
            {!isEmpty(props.photos) &&
            <sidebar className='margin-left:10%'>
            <ImageHandler photos={props.photos} />           
            </sidebar>}
            <article>
            
            <DeleteButton className={classes.avatar}
                          del={removalModalHandler}
                          />
              <h4>{props.data.title}</h4>
              <p>{props.data.info}<br/><br/>
                  <br/>Date: {props.data.date}
                  <br/>Time: {props.data.time}
                  <br/>
                </p>
                  {props.data.location !== undefined ?
                    <p>Location: {props.data.location.address}</p>
                    : <p>Error: Trouble Finding Location</p>
                }
            </article>
        </section>
        <br/>
        {/* <div>
          {props.data.images !== undefined ? 
            (props.data.images.map((image) => 
              <input type="file" class="filepond" name="cover" photo={image} imagePreview={true}/>))
              
              : <h1>No Photos Found</h1>
          } 
          <br/>
        </div>  */}
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
                  onClick={() => deleteEntry(props.data)}
                  size="large"
                  color="inherit"
                  simple
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


