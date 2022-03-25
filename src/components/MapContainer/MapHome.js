import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Spinner from '../Spinner/LoadingSpinner'
import isEmpty from 'lodash.isempty'

// import Map from './Map';
// const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function MapHome (props) {
   
  return (
    // Important! Always set the container height explicitly
    <div style={props.mapSize}>
      {!isEmpty(props.location) ? (
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAPS_API }}
        center={props.location}
        zoom={props.zoom}

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

