import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Spinner from '../Spinner/LoadingSpinner'
import isEmpty from 'lodash.isempty'

// import Map from './Map';
// const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function MapHome (props) {


  // const getInfoWindowString = (place) => `
  // <div>
  //   <div style="font-size: 16px;">
  //     ${place.name}
  //   </div>
  //   <div style="font-size: 14px;">
  //     <span style="color: grey;">
  //     ${place.rating}
  //     </span>
  //     <span style="color: orange;">${String.fromCharCode(9733).repeat(Math.floor(place.rating))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}</span>
  //   </div>

  //   <div style="font-size: 14px; color: grey;">
  //     ${'$'.repeat(place.price_level)}
  //   </div>
  //   <div style="font-size: 14px; color: green;">
  //     ${place.opening_hours.open_now ? 'Open' : 'Closed'}
  //   </div>
  // </div>`;

  // function handleApiLoaded(map, maps, places){
  //   const markers = []
  //   const infoWindows = []

  //   Object.values(places).map((place) => {
  //     markers.push(new maps.Marker({
  //       position: {
  //         lat: place.lat,
  //         lng: place.lng,
  //       },
  //       map,
  //     }));

  //     infoWindows.push(new maps.infoWindows({
  //       content: getInfoWindowString(place),
  //     }));
  //   })
  //   }
    
  return (
    // Important! Always set the container height explicitly
    <div style={props.mapSize}>
      {!isEmpty(props.location) ? (
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAPS_API }}
        center={props.location}
        zoom={props.zoom}
        // yesIWantToUseGoogleMapApiInternals
        // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, loc)}
      >
      <Marker
        text={"Here"}
        lat={props.location.lat}
        lng={props.location.lng}/>
        
      </GoogleMapReact>)
      :<Spinner/>}

    </div>
  );
  }

