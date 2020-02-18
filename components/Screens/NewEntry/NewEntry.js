import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ColorButton } from "../../../components/Button/Button";
import styled from 'styled-components';
import ImageHandler from "../../ImageHandler/ImageHandler";
import DataHandling from "../../DataHandling/DataHandling";
import { Link } from "react-router-dom";
import "./NewEntry.css";
// import { render } from '@testing-library/react';

const Input = styled.input `
  padding: 0.5em;
  margin: 0.5em;
  color: "palevioletred"};
  background: papayawhip;
  border: 2px solid orange;
  border-radius: 8px;
`;

const Component = styled.div `
  background: papayawhip;
`;

const Textarea = styled.textarea `
  padding: 0.5em;
  margin: 0.5em;
  color: "palevioletred"};
  background: papayawhip;
  padding: 10px;
  border: 2px solid orange;
  border-radius: 8px;
`

const Table = styled.table `
  margin-left: auto; 
  margin-right: auto;
  padding-top: 4px;
  padding-bottom: 4px;
  text-align: left;
  border-collapse: separate !important;
  border: 3px solid orange;
  border-radius: 8px;
`;

const NewEntry = (props) => {
 
    const [dataState, setDataState] = useState([]);
    const [title, setTitle] = useState("");
    const [info, setInfo] = useState("");
    const [images, setImages] = useState([]);
    const [imageType, setImageType] = useState([]);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    // const [gps, setGPS] = useState([]);
    const [location, setLocation] = useState([]);
    const [intervalIsSet, setIntervalIsSet] = useState(false);
    // const [idToDelete, setIdToDelete] = useState(null);
    // const [idToUpdate, setIdToUpdate] = useState(null);
    // const [updateToApply, setUpdateToApply] = useState(null);
    // myCallBack = myCallBack.bind(this)

    var findDate = new Date();
    setDate((findDate.getMonth()+1) + "-" + findDate.getDate() + "-" + findDate.getFullYear());
    setTime(findDate.getHours() + ":" + findDate.getMinutes() + ":" + findDate.getSeconds());
  

    const titleHandler = event => {
        setTitle(event.target.value);
    };

    const infoHandler = event => {
        setInfo(event.target.value);
    };

    
    const myCallBack = (handlerFileData) => {
      if (handlerFileData !== undefined && handlerFileData.length > 1){
        if (handlerFileData[(handlerFileData.length)-1].name == undefined){
          handlerFileData.pop();
        }
        setImages(handlerFileData);
        setImageType(handlerFileData.map(file => file.type));
        console.log(`handler${handlerFileData}`);
        console.dir(handlerFileData);
      }
        console.log(`handler ${handlerFileData}`);
    };

      return (
          <Component className="NewEntry">
              <h2>Journal Entry</h2>
              <Input  type="text" 
                      placeholder="Title" 
                      value={title}
                      onChange={titleHandler}
                      />
              <br/>
              <Textarea   cols="40" 
                          name="comments" 
                          rows="5" 
                          placeholder="Record the moment"
                          value={info}
                          onChange={infoHandler}
                          />
              <br/>
              <Table>
                <thead>
                  <tr>
                    <th>TOD</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Date: {date}</th>
                    <th>City: {props.currentLocation.city} </th>
                  </tr>
                  <tr>
                    <th>Time: {time}</th>
                    <th>Latitude: {"\t"} {Number(props.currentLocation.gps.lat).toFixed(4)}</th>
                  </tr>
                  <tr>
                    <th></th>
                    <th>Longitude: {"\t"} {Number(props.currentLocation.gps.lng).toFixed(4)}</th>   
                  </tr>     
                </tbody>
              </Table>
              <br/>
              Add some photos!
              <ImageHandler className="filepond--item" preview={false} parentFileCallback={myCallBack}/>
              <br/><br/>
              <ColorButton    onClick={() => props.newData(title)}
                              component={Link}
                              to="/entries"
                            >
                  Entry Finished
              </ColorButton>       
          </Component>
      );
}

export default NewEntry;