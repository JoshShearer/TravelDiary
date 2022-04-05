import React, { forwardRef, useState } from "react";
import MapHome from "../MapContainer/MapHome";
import { useEntries } from "../../containers/TravDiary/EntryContext";
import DeleteButton from "../CustomButtons/DeleteButton";
import EditButton from "../CustomButtons/EditButton";
import CButton from "../CButton";
import IconButton from "@mui/material/IconButton";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography"
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import InfoIcon from "@mui/icons-material/Info";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DateRangeIcon from "@mui/icons-material/DateRange";
import TitleIcon from "@mui/icons-material/Title";
import { Box } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import CBox from "../CBox";
import CInput from "../CInput";
import { Grid } from "@mui/material";
import ImageHandler from "../ImageHandler/ImageHandler";
import Slide from "@mui/material/Slide";
import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";
import "./EntryContainer.css";
import isEmpty from "lodash.isempty";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  root: {
    maxWentryIDth: 700,
    backgroundColor: grey[800],
    color: grey[100],
    borderRadius: "10px",
  },
  media: {
    height: 280,
  },
  avatar: {
    marginLeft: "auto",
    float: "left!important",
  },
});

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function DataContainer(props) {
  const [classicModal, setClassicModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(props.data.title);
  const [info, setInfo] = useState(props.data.info);
  const [address, setAddress] = useState(props.data.location.address);

  const [entryData, setEntryData] = useEntries();

  const titleHandler = (event) => {
    setTitle(event.target.value);
    // localStorage.setItem('title', event.target.value)
  };

  const infoHandler = (event) => {
    setInfo(event.target.value);
    // localStorage.setItem('info', event.target.value)
  };

  const addressHandler = (event) => {
    setAddress(event.target.value);
    // localStorage.setItem('info', event.target.value)
  };

  function removalModalHandler(entryid) {
    setClassicModal(true);
    // props.remove(entryid);
  }

  function editHandler(entryid) {
    setEditMode(true);
  }

  function modifyEntry(entryid) {
    
    const newEntry = { id: entryid.id,
                      title: title,
                      info: info,
                      address: address}
    props.update(newEntry);
    setEditMode(false);
  }

  function deleteEntry(entryid) {
    props.remove(entryid);
    setClassicModal(false);
  }

  const classes = useStyles();

  const mapStyles = { width: "100%", height: "100%" };

  return (
    <div>
      <section>
        <sidebar>
          <MapHome
            className="mapEntries"
            mapSize={mapStyles}
            location={props.data.gps}
            zoom={8}
            static="true"
          />
        </sidebar>
        {!isEmpty(props.photos) && (
          <sidebar className="margin-left:10%">
            <ImageHandler photos={props.photos} />
          </sidebar>
        )}
        <article>
          {/* <DeleteButton className={classes.avatar} del={removalModalHandler} /> */}
          {/* {!editMode ? 
              <>
              <h4>{title}</h4>
              <p>{info}<br/><br/>
                  <br/>Date: {props.data.date}
                  <br/>Time: {props.data.time}
                  <br/>
                </p>
                    <p>Location: {address}</p></>
                   
                : */}
          <Box item xs={12} md={6} sx={{ flexGrow: 1 }}>
            <Demo>
              <List
                // sx={{
                //   width: "100%",
                //   maxWidth: 500,
                //   bgcolor: "background.paper",
                //   height: "280px",
                //   borderRadius: "10%",
                // }}
              >
                <ListItem
                  secondaryAction={
                      <DeleteButton
                        className={classes.avatar}
                        del={removalModalHandler}
                      />
                   }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <TitleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  {!editMode ? (
                    <ListItemText primary={props.data.title} />
                  ) : (
                    <CBox >
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <CInput
                            type="email"
                            label="Title"
                            fullWidth
                            defaultValue={props.data.title}
                            onChange={titleHandler}
                          />
                        </Grid>
                      </Grid>
                    </CBox>
                  )}
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <InfoIcon />
                    </Avatar>
                  </ListItemAvatar>
                  {!editMode ? (
                    <ListItemText secondary={props.data.info} />
                  ) : (
                    <CBox>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <CInput
                            type="standard"
                            label="Share your thoughts..."
                            fullWidth
                            multiline
                            defaultValue={props.data.info}
                            rows={2}
                            onChange={infoHandler}
                          />
                        </Grid>
                      </Grid>
                    </CBox>
                  )}
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LocationOnIcon />
                    </Avatar>
                  </ListItemAvatar>
                  {!editMode ? (
                    <ListItemText secondary={props.data.location.address} sx={{fontWeight: 'bold',}} />
                  ) : (
                    <CBox>
                      <Grid container >
                        <Grid item xs={12}>
                          <CInput
                            type="email"
                            label="Address"
                            fullWidth
                            defaultValue={props.data.location.address}
                            onChange={addressHandler}
                          />
                        </Grid>
                      </Grid>
                    </CBox>
                  )}
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <DateRangeIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText secondary={props.data.date} />
                </ListItem>
                <ListItem
                  secondaryAction={
                      <EditButton
                        className={classes.avatar}
                        edit={editHandler}
                      />
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <AccessTimeIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText secondary={props.data.time} />
                </ListItem>
                {editMode && (
                  <ListItem>
                    <CBox>
                      <Grid container spacing={8}>
                        <Grid item xs={6} md={3}>
                          <CButton onClick={() => modifyEntry(props.data)}>Finish</CButton>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <CButton onClick={() => setEditMode(false)}>
                            Cancel
                          </CButton>
                        </Grid>
                      </Grid>
                    </CBox>
                  </ListItem>
                )}
              </List>
            </Demo>
          </Box>
          {/* <Grid container spacing={2} sx={{ mx: "auto" }}>
            <Grid item xs={6}>
              <CInput
                variant="email"
                label="Title"
                fullWidth
                onChange={titleHandler}
              />
            </Grid>
            <Grid item xs={6}>
              <CInput
                type="standard"
                label="Share your thoughts..."
                fullWidth
                multiline
                rows={4}
                onChange={infoHandler}
              />
              <Grid item xs={6}>
                <Item>Date: {props.data.date}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>Time: {props.data.time}</Item>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <CInput
                variant="email"
                label="Address"
                fullWidth
                onChange={addressHandler}
              />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <LightButton page="" buttonText="Finish" click={modifyEntry} />
              </Grid>
              <Grid item xs={6} md={3}>
                <LightButton
                  page=""
                  buttonText="Cancel"
                  click={() => setEditMode(false)}
                />
              </Grid>
            </Grid>
          </Grid> */}
          {/* } */}
        </article>
      </section>
      <br />
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
          paper: classes.modal,
        }}
        open={classicModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setClassicModal(false)}
        aria-labelledby="classic-modal-Slide-title"
        aria-describedby="classic-modal-Slide-description"
      >
        <DialogTitle
          entryid="classic-modal-Slide-title"
          fontWeight="bold"
          className={classes.modalHeader}
        >
          Are you sure you want to delete this entry?
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
      <br />
    </div>
  );
}

//     entryid: Number,
//     title: String,
//     info: String,
//     image: [{type: Buffer}],
//     imageType: [{type: String}],
//     date: String,
//     time: String,
//     gps: {  lat: String,
