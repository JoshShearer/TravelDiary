import React, { useState } from 'react';
import DarkButton from "../../components/CustomButtons/DarkButton";
import MapHome from "../../components/MapContainer/MapHome";
// import { makeStyles } from "@mui/styles";
// import styled from 'styled-components';
import ImageHandler from "../../components/ImageHandler/ImageHandler";
import DataHandling from '../../components/DataHandling/DataHandling';
import "./NewEntry.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { Grid } from '@mui/material';
import Switch from "@mui/material/Switch";
import CBox from '../../components/CBox';
import CInput from '../../components/CInput';
import Typography from '../../components/Typography';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useLocation } from '../../containers/TravDiary/LocationContext';
import { useEntries } from '../../containers/TravDiary/EntryContext';



const NewEntry = (props) => {
 
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [images, setImages] = useState([]);
  const [imageType, setImageType] = useState([]);

  const [loc, ] = useLocation();
  const [entryData, setEntryData] = useEntries();
  console.log("NewEntLoc", loc)
  // const loc = locData();
  // console.log("NewEntry Location Data", loc);
  
  const mapStyles = {width: '100%', 
                     height: '100%'};

    var findDate = new Date(); 
    // setDate((findDate.getMonth()+1) + "-" + findDate.getDate() + "-" + findDate.getFullYear());
    // setTime(findDate.getHours() + ":" + findDate.getMinutes() + ":" + findDate.getSeconds());
  

    const titleHandler = event => {
        setTitle(event.target.value);
    };

    const infoHandler = event => {
        setInfo(event.target.value);
    };
    function wholetime(seconds){
      if (seconds < 10){
        return (0 + seconds)
      }else{
        return seconds
      }}
    
    const myCallBack = (handlerFileData) => {
      if (handlerFileData !== undefined && handlerFileData.length > 1){
        if (handlerFileData[(handlerFileData.length)-1].name === undefined){
          handlerFileData.pop();
        }
        setImages(handlerFileData);
        setImageType(handlerFileData.map(file => file.type));
      }
    };
    const dataEntry = (newData) => {
        DataHandling(newData, [entryData,setEntryData], 'Put')
    }


      return (
        <div className="NewEntry">
            {/* <h2>Journal Entry</h2>
            <Input  type="text" 
                    placeholder="Title" 
                    value={title}
                    onChange={titleHandler}
                    />
            <br/>
            <TextareaAutosize   cols="40" 
                        name="comments" 
                        minRows="5" 
                        placeholder="Record the moment"
                        value={info}
                        onChange={infoHandler}
                        />
            <br/> */}
            <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">
            <Typography variant="h3" mb={1}>
              Journal Entry
            </Typography>
           </Grid>
            <CBox component="form" role="form">
                  <CBox mb={2}>
                    <CInput type="email" label="Title" fullWidth />
                  </CBox>
                  <CBox mb={2}>
                    <CInput type="password" label="Share your thoughts..." fullWidth />
                  </CBox>
                  <CBox display="flex" alignItems="center" ml={-1}>
                </CBox>
                </CBox>
            <sidebar>
              <MapHome   className="mapEntries" 
                              mapSize={mapStyles}  
                              location={loc.gps} 
                              zoom={8}
                              static='true'/>
            </sidebar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>TOD</TableCell>
                  <TableCell>Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Date: {((findDate.getMonth()+1) + "/" + findDate.getDate() + "/" + findDate.getFullYear())}</TableCell>
                  <TableCell><div>City: {loc.location.city}</div> <div>Country: {loc.location.country}</div></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Time: {(findDate.getHours() + ":" + findDate.getMinutes() + ":" + findDate.getSeconds())}</TableCell>
                  <TableCell>Latitude: {"\t"} {Number(loc.gps.lat).toFixed(4)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Longitude: {"\t"} {Number(loc.gps.lng).toFixed(4)}</TableCell>   
                </TableRow>     
              </TableBody>
            </Table>
            <br/>
            Add some photos!
            <ImageHandler className="filepond--item" preview={false} parentFileCallback={myCallBack}/>
            <br/><br/>
            <DarkButton    click={() => dataEntry({
                                              title: title,
                                              info: info,
                                              images: images,
                                              imageType:imageType,
                                              date: ((findDate.getMonth()+1) + "/" + findDate.getDate() + "/" + findDate.getFullYear()),
                                              time: (findDate.getHours() + ":" + wholetime(findDate.getMinutes()) + ":" + wholetime(findDate.getSeconds())),
                                              location: loc.location,
                                              gps: loc.gps
                                              }
                                            )}
                            buttonText="Enter"
                            page="/entries"
                          />
            <br/><br/><br/><br/><br/><br/>.
        </div>
      );
}

export default NewEntry;

