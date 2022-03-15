import React, { useEffect, useState } from 'react';
import GoogleMapReact, { fitBounds } from 'google-map-react';
import { Marker , InfoWindow } from './MapParts';
import { Location } from '../../containers/TravDiary/LocationContext';
import Spinner from '../Spinner/LoadingSpinner'

// import Map from './Map';
// const AnyReactComponent = ({ text }) => <div>{text}</div>;
const getInfoWindowString = (place) => `
<div>
  <div style="font-size: 16px;">
    ${place.name}
  </div>
  <div style="font-size: 14px;">
    <span style="color: grey;">
    ${place.rating}
    </span>
    <span style="color: orange;">${String.fromCharCode(9733).repeat(Math.floor(place.rating))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}</span>
  </div>
  <div style="font-size: 14px; color: grey;">
    ${place.types[0]}
  </div>
  <div style="font-size: 14px; color: grey;">
    ${'$'.repeat(place.price_level)}
  </div>
  <div style="font-size: 14px; color: green;">
    ${place.opening_hours.open_now ? 'Open' : 'Closed'}
  </div>
</div>`;

function handleApiLoaded(map, maps, places){
const markers = []
const infoWindows = []

places.map((place) => {
  markers.push(new maps.Marker({
    position: {
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
    },
    map,
  }));

  infoWindows.push(new maps.infoWindows({
    content: getInfoWindowString(place),
  }));
})
}

export default function MapHome () {

  const [loc, setLoc] = Location();
  const [places, setPlaces] = useState([])
  
  useEffect(() =>  {
    fetch('places.json')
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((result) => {
          result.show = false; // eslint-disable-line no-param-reassign
        });
        setPlaces({ places: data.results });
      });
  },[])

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      {('center' in loc) && 
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAPS_API }}
        defaultCenter={loc.center}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, places)}
      >
        {places.map((place) => (
              <Marker
                key={place.id}
                text={place.name}
                lat={place.geometry.location.lat}
                lng={place.geometry.location.lng}
              />))}
      </GoogleMapReact>}
    </div>
  );
  }

