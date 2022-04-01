import React, { useEffect, useState, useCallback } from "react";
import DarkButton from "../../components/CustomButtons/DarkButton";
import MapHome from "../../components/MapContainer/MapHome";
import ImageHandler from "../../components/ImageHandler/ImageHandler";
import { putDataToDB } from "../../components/DataHandling/DataHandling";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CBox from "../../components/CBox";
import CInput from "../../components/CInput";
import Typography from "../../components/Typography";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useLocation } from "../../containers/TravDiary/LocationContext";
import { useEntries } from "../../containers/TravDiary/EntryContext";
import styled from "styled-components";


const Wrapper = styled.main`
  width: 100%;
  height: 100%;

  .main-wrapper {
    height: 85vh;
    margin: 5px 5px;
    filter: drop-shadow(-1px 5px 3px #ccc);
    border-width: 3px;
    }
  }
  .info-wrapper {
    margin-top: 15px;
  }
  .map-details {
    text-align: center;
    font-size: 1.2em;
  }
  .map-details span {
    font-weight: bold;
  }
  .search-input {
    font-size: 1.2em;
    width: 80%;
  }
`;

export default function NewEntry () {

  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [images, setImages] = useState([]);

  const [loc, setLoc,] = useLocation();
  const [entryData, setEntryData] = useEntries();
  const stableLoad = useCallback(loc, []);
  
  useEffect(() => {
    reloadLostData();
  },[reloadLostData])

  const reloadLostData = () => {
    const data = JSON.parse(localStorage.getItem("locationData"));
    console.log("data ", data);
    if(loc === undefined && data){
      setLoc(localStorage.getItem('locationData'));
      // setPageRefresh(!pageRefresh)
    }
    if(!title && localStorage.getItem("title")){
      setTitle(localStorage.getItem("title"));
    }
    if(!info && localStorage.getItem("info")){
      setTitle(localStorage.getItem("info"));
    }
  }

  const mapStyles = { width: "100%", height: "100%" };

  var findDate = new Date();
  // setDate((findDate.getMonth()+1) + "-" + findDate.getDate() + "-" + findDate.getFullYear());
  // setTime(findDate.getHours() + ":" + findDate.getMinutes() + ":" + findDate.getSeconds());

  const titleHandler = (event) => {
    setTitle(event.target.value);
    localStorage.setItem('title', event.target.value)
  };

  const infoHandler = (event) => {
    setInfo(event.target.value);
    localStorage.setItem('info', event.target.value)
  };

  function wholetime(seconds) {
    if (seconds < 10) {
      return "0" + seconds;
    } else {
      return seconds;
    }
  }

  const photoCallBack = (imageFileData) => {
    if (imageFileData !== undefined && imageFileData.length > 0) {
      if (imageFileData[imageFileData.length - 1].name === undefined) {
        imageFileData.pop();
      }
      setImages(imageFileData);
    }
  };
  
  const dataEntry = (newData) => {
    putDataToDB(newData, entryData)
    .then(success => console.log(success))
    .catch(err => console.log(err));
    setEntryData([])
  };

  return (
    <>

        <CBox component="section" py={12}>
          <Container>
            <Grid
              container
              item
              justifyContent="center"
              xs={10}
              lg={7}
              mx="auto"
              textAlign="center"
            >
              <Typography variant="h3" mb={1}>
                Journal Entry
              </Typography>
            </Grid>

            <Grid container item xs={12} lg={7} sx={{ mx: "auto" }}>
              <CBox
                width="100%"
                component="form"
                method="post"
                autocomplete="off"
              >
                <CBox p={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <CInput type="email" label="Title" fullWidth onChange={titleHandler}/>
                    </Grid>
                    <Grid item xs={12}>
                        <CInput
                          type="standard"
                          label="Share your thoughts..."
                          fullWidth
                          multiline
                          rows={4}
                          onChange={infoHandler}
                        />
                    </Grid>
                    <Grid item xs={12}>
                      <Wrapper>
                      <div style={{ height: '25vh', width: '100%' }} className="main-wrapper">
                        <MapHome
                          
                          mapSize={mapStyles}
                          location={loc.gps}
                          zoom={8}
                          static="true"
                        />
                        </div>
                      </Wrapper>
                    </Grid>
                    <Grid item xs={12}>
                      <TableContainer >
                        <Table sx={{ minWidth: 400 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Time of Day</TableCell>
                              <TableCell align="right">Location</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                Date:{" "}
                                {findDate.getMonth() +
                                  1 +
                                  "/" +
                                  findDate.getDate() +
                                  "/" +
                                  findDate.getFullYear()}
                              </TableCell>
                              <TableCell>
                                <div>City: {loc.location.city}</div>{" "}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell></TableCell>
                              <TableCell>
                                <div>Country: {loc.location.country}</div>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                Time:{" "}
                                {findDate.getHours() +
                                  ":" +
                                  wholetime(findDate.getMinutes()) +
                                  ":" +
                                  wholetime(findDate.getSeconds())}
                              </TableCell>
                              <TableCell>
                                Latitude: {"\t"}{" "}
                                {Number(loc.gps.lat).toFixed(4)}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell></TableCell>
                              <TableCell>
                                Longitude: {"\t"}{" "}
                                {Number(loc.gps.lng).toFixed(4)}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      justifyContent="center"
                      textAlign="center"
                    >
                      <Typography variant="h5" mb={1}>
                        Add some photos!
                      </Typography>
                    </Grid>
                    <Grid item xs={12} justifyContent="center">
                      <ImageHandler
                        className="filepond--item"
                        preview={false}
                        parentFileCallback={photoCallBack}
                      />
                    </Grid>
                    <br />
                    <Grid item xs={12} justifyContent="center">
                      <DarkButton
                        click={() =>
                          dataEntry({
                            title: title,
                            info: info,
                            images: images.file,
                            date:
                              findDate.getMonth() +
                              1 +
                              "/" +
                              findDate.getDate() +
                              "/" +
                              findDate.getFullYear(),
                            time:
                              findDate.getHours() +
                              ":" +
                              wholetime(findDate.getMinutes()) +
                              ":" +
                              wholetime(findDate.getSeconds()),
                            location: loc.location,
                            gps: loc.gps,
                          })
                        }
                        buttonText="Enter"
                        page="/entries"
                      />
                    </Grid>
                    <br />
                  </Grid>
                </CBox>
              </CBox>
            </Grid>
          </Container>
        </CBox>
    </>
  );
};
