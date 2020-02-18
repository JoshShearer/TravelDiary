import React, { Component, useState, useEffect } from 'react';
import  { createStore } from 'react-redux';
import axios from 'axios';
import NewEntry from '../Screens/NewEntry';
import Entries from '../Screens/Entries';


export default function DataHandling (props) {
    
    const [dataState, setDataState] = useState([]);
    const [title, setTitle] = useState("");
    const [info, setInfo] = useState("");
    const [image, setImage] = useState([]);
    const [imageType, setImageType] = useState([]);
    // const [date, setDate] = useState("");
    // const [time, setTime] = useState("");
    const [gps, setGPS] = useState([]);
    const [intervalIsSet, setIntervalIsSet] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [idToUpdate, setIdToUpdate] = useState(null);
    const [updateToApply, setUpdateToApply] = useState(null);
  
    useEffect(() => {
        getDataFromDb();
        if (!intervalIsSet) {
          let interval = setInterval(getDataFromDb, 2000);
          setIntervalIsSet(interval);
        }
        return function unmounting() {
          if (intervalIsSet) {
            clearInterval(intervalIsSet);
            setIntervalIsSet(null);
            console.log("unmounting now");
          }
        };
      }, [intervalIsSet]);                  

    const getDataFromDb = () => {
      axios
        .get("http://localhost:3001/api/getData")
        .then(res => {
          setDataState([...res.data.data]);
        })
        .catch(err => console.log("axios error", err));
    };
  
    const putDataToDB = title => {
      let currentIds = dataState.map(props => props.id);
      let idToBeAdded = 0;
      while (currentIds.includes(idToBeAdded)) {
        ++idToBeAdded;
      }
      const newEntry = {
        id: idToBeAdded,
        title: title,
        info: info,
        img: image,
        imgType: imageType, 
        date: props.date,
        time: props.time,
        gps: gps
      };
      setDataState([...dataState, newEntry]);
      console.log(newEntry)
      axios
        .post("http://localhost:3001/api/putData", newEntry)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };
  
    const deleteFromDB = idToDelete => {
      parseInt(idToDelete);
      let objectToDelete = null;
      dataState.forEach(dat => {
        if (dat.id === idToDelete) {
          objectToDelete = dat.id;
        }
      });
  
      axios.delete("http://localhost:3001/api/deleteData", {
        data: {
          id: objectToDelete
        }
      });
    };
  
    const updateDB = (idToUpdate, updateToApply) => {
      let objIdToUpdate = null;
      parseInt(idToUpdate);
      dataState.forEach(dat => {
        if (dat.id === idToUpdate) {
          objIdToUpdate = dat._id;
        }
      });
  
      axios.post("http://localhost:3001/api/updateData", {
        id: objIdToUpdate,
        update: { title: updateToApply }
      });
    };

    const nLocation = () => {
      if (navigator.geolocation){
          navigator.geolocation.getCurrentPosition(getCoordinates);
      }else{
          alert("Geolocation is not supported!");
      }
    }
    const getCoordinates = (position) => {
        setGPS({lat: position.coords.latitude,
          long: position.coords.longitude}
        })    
  
    nLocation();
    var findDate = new Date();
    var date = (findDate.getMonth()+1) + "-" + findDate.getDate() + "-" + findDate.getFullYear();
    var time = findDate.getHours() + ":" + findDate.getMinutes() + ":" + findDate.getSeconds();
    
    
    const titleHandler = event => {
        setTitle(event.target.value)
    }

    const infoHandler = event => {
        setInfo(event.target.value)
    }
      return (
        <div>
          {props.page = "newEntry"
            ? return <NewEntry ourTitleFunction={this.titleHandler} ourInfoHandler={this.infoHandler}/>
            : return <Entries />
          }
        </div>
      )
}
