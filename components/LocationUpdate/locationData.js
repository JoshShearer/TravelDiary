import React, { Component } from 'react';
import axios from 'axios';
import {JournalEntries} from "../../data/db/data";

export default class LocationData extends Component{
    
componentDidMount(){
    this.nLocation();
  }

nLocation(){
  setTimeout(() => {
  const getCurrentPosition = position => {      
        
          //  https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const revGeocode = `https://nominatim.openstreetmap.org/reverse?lat=${position.gps.lat}&lon=${position.gps.lng}&format=json`;
    console.log("prior to axios call")
    var DataPass = {};
    axios
        .get(proxyURL+revGeocode)
        .then(res => {
            console.log(res)
            const locationData = (res.data.address);
            console.log({   
                                  // gps: {lat: position.lat,
                                  //       lng: position.lng},
                                  neighborhood: locationData.suburb,
                                  city: locationData.city,
                                  state: locationData.state,
                                  country: locationData.country
                                })
                      }) 
            // console.log("DataPass")  
            // console.log(DataPass)
            // this.props.DataPass(DataPass)
            // console.log(locationData)
        .catch(err => console.log(err));
    }
   
  
    getCurrentPosition(this.props.Coord);
          // props.newData({entryData})
  }, 2000);
}

render(){
  return(
    // <div>{console.log("quick test")}testing</div>
    <div></div>
  )
}
}