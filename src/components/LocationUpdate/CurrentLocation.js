import { useEffect } from 'react';
import { useLocation } from '../../containers/TravDiary/LocationContext';



export function CurrentLocation () {
  
  const [, setLoc] = useLocation();

  useEffect(() => {
  // const getCoordinates = position => {
  //   console.log("axios call started locationAPI")
  //   // const proxyURL = "https://cors-anywhere.herokuapp.com/";
  //   const proxyURL = "https://nominatim.openstreetmap.org"
  //   const revGeocode = `/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`;
  //   return axios
  //       .get(proxyURL+revGeocode)
  //       .then(res => {
  //           console.log(res)              
  //           const locationData = (res.data.address);
  //           setLoc({   
  //                     center: {lat: position.coords.latitude,
  //                           lng: position.coords.longitude},
  //                     neighborhood: locationData.suburb,
  //                     city: locationData.city,
  //                     state: locationData.state,
  //                     country: locationData.country
  //                 })
  //             }) 
  //       .catch(err => console.log(err));
        

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
      // console.log("Getting Current Location")
        setLoc({   
        gps: {lat: position.coords.latitude,
                lng: position.coords.longitude},
        })})
    }else{
    alert("Geolocation is not supported!");
    }
  },[]);
}