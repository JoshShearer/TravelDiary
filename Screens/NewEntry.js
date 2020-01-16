import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ColorButton } from "../Components/Button";
import ImageHandler from "../Components/ImageHandler";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import DataHandling from "../data/db/DataHandling";

const NewEntry = () => {

    const stateChange='false'
    const data = DataHandling(stateChange);  
  
    // const [dataState, setDataState] = useState([]);
    // const [title, setTitle] = useState("");
    // const [info, setInfo] = useState("");
    // const [image, setImage] = useState([]);
    // const [imageType, setImageType] = useState([]);
    // // const [date, setDate] = useState("");
    // // const [time, setTime] = useState("");
    // const [gps, setGPS] = useState([]);
    // const [intervalIsSet, setIntervalIsSet] = useState(false);
    // // const [idToDelete, setIdToDelete] = useState(null);
    // // const [idToUpdate, setIdToUpdate] = useState(null);
    // // const [updateToApply, setUpdateToApply] = useState(null);
  
    // useEffect(() => {
    //     getDataFromDb();
    //     if (!intervalIsSet) {
    //       let interval = setInterval(getDataFromDb, 2000);
    //       setIntervalIsSet(interval);
    //     }
    //     return function unmounting() {
    //       if (intervalIsSet) {
    //         clearInterval(intervalIsSet);
    //         setIntervalIsSet(null);
    //         console.log("unmounting now");
    //       }
    //     };
    //   }, [intervalIsSet]);                  

    // const getDataFromDb = () => {
    //   axios
    //     .get("http://localhost:3001/api/getData")
    //     .then(res => {
    //       setDataState([...res.data.data]);
    //     })
    //     .catch(err => console.log("axios error", err));
    // };
  
    // const putDataToDB = title => {
    //   let currentIds = dataState.map(data => data.id);
    //   let idToBeAdded = 0;
    //   while (currentIds.includes(idToBeAdded)) {
    //     ++idToBeAdded;
    //   }
    //   const newEntry = {
    //     id: idToBeAdded,
    //     title: title,
    //     info: info,
    //     img: image,
    //     imgType: imageType, 
    //     date: date,
    //     time: time,
    //     gps: gps
    //   };
    //   setDataState([...dataState, newEntry]);
    //   console.log(newEntry)
    //   axios
    //     .post("http://localhost:3001/api/putData", newEntry)
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err));
    // };
  
    // const deleteFromDB = idToDelete => {
    //   parseInt(idToDelete);
    //   let objectToDelete = null;
    //   dataState.forEach(dat => {
    //     if (dat.id === idToDelete) {
    //       objectToDelete = dat.id;
    //     }
    //   });
  
    //   axios.delete("http://localhost:3001/api/deleteData", {
    //     data: {
    //       id: objectToDelete
    //     }
    //   });
    // };
  
    // const updateDB = (idToUpdate, updateToApply) => {
    //   let objIdToUpdate = null;
    //   parseInt(idToUpdate);
    //   dataState.forEach(dat => {
    //     if (dat.id === idToUpdate) {
    //       objIdToUpdate = dat._id;
    //     }
    //   });
  
    //   axios.post("http://localhost:3001/api/updateData", {
    //     id: objIdToUpdate,
    //     update: { title: updateToApply }
    //   });
    // };
    const nLocation = () => {
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(getCoordinates);
        }else{
            alert("Geolocation is not supported!");
        }
    }
    const getCoordinates = (position) => {
        setGPS( {lat: position.coords.latitude,
                long: position.coords.longitude})
        }    
    
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

    // const imageHandler = async event => {
    //     const files = event.target.files
    //     const form = new FormData()
    //     for (let i=0; i < files.length; i++){
    //         form.append('files', files[i], files[i].name)
    //         console.log(form)
    //     }
    //     try {
    //             let request = await fetch('/upload', {
    //                 method: 'post',
    //                 body: form,
    //             })
    //             const response = await request.json(
    //             console.log('Response', response)
    //             )
    //     }catch (e) {
    //         alert('Upload Failed')
    //         console.log('Error upload failed', e)
    //     }
    // }   

    
    
        return (
            <form className="NewEntry">
                <h2>Journal Entry</h2>
                <input  type="text" 
                        placeholder="Entry Title" 
                        value={title}
                        onChange={titleHandler}
                        />
                <br/>
                Record the moment
                <br/>
                <textarea   cols="40" 
                            name="comments" 
                            rows="5" 
                            value={info}
                            onChange={infoHandler}
                            >
                            </textarea>
                <br/>
                Date:
                {date}
                <br/>
                Time:
                {time}
                <br/>
                Location:         
                <br/>
                Latitude: 
                {gps.lat}
                <br/>
                Longitude: 
                {gps.long}
                <br/>
                <br/>
                Add some photos!
                <ImageHandler className="filepond--item" preview={false}/>
                <br/><br/>
                <ColorButton    onClick={() => putDataToDB(title)}
                                component={Link}
                                to="/entries"
                             >
                    Entry Finished
                </ColorButton>       
                

            </form>
        );
};

export default NewEntry;