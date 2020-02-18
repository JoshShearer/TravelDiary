import React from 'react';
import axios from 'axios';


export default class CurrentLocation{
    
componentDidMount(){
    this.nLocation();
  }

nLocation(){
  setTimeout(() => {
    const getCoordinates = position => {      
        
          //  https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const revGeocode = `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`;
    axios
        .get(proxyURL+revGeocode)
        .then(res => {
            console.log(res)
            const locationData = (res.data.address);
            locationData &&
              const DataPass = {currentLocation:{   
                                  gps: {lat: position.coords.latitude,
                                        lng: position.coords.longitude},
                                  neighborhood: locationData.suburb,
                                  city: locationData.city,
                                  state: locationData.state,
                                  country: locationData.country
                                },
                                loading: false
                                }
                      })   
        .catch(err => console.log(err));
    }
  
    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getCoordinates);
    }else{
    alert("Geolocation is not supported!");
    }
  }, 1000);
}

render(){
  return(
    <div></div>
  )
}
}