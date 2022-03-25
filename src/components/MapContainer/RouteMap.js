import React, { Component } from 'react';
import isEmpty from 'lodash.isempty';
import PropTypes from 'prop-types';

// examples:
import GoogleMap from '../MapContainer/GoogleMap';
import Spinner from '../Spinner/LoadingSpinner';
// consts: [34.0522, -118.2437]

const getInfoWindowString = (place) => `
    <div>
      <div style="font-size: 16px; font-weight: bold;">
        ${place.title}
        <span style="font-size: 14px; font-weight: normal;">${place.date}</span>
      </div>
      <div style="font-size: 14px;">       
        ${place.info}
      </div>
      <div style="font-size: 14px; color: grey;">
        ${place.location.address}
      </div>
    </div>
`;


// Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
const handleApiLoaded = (map, maps, places) => {
  const markers = [];
  const infowindows = [];
  const markerBounds = new maps.LatLngBounds();
  

  places.forEach((place) => {
    markers.push(new maps.Marker({
      position: {
        lat: place.gps.lat,
        lng: place.gps.lng,
      },
      map,
    }));

    infowindows.push(new maps.InfoWindow({
      content: getInfoWindowString(place),
    }));

    places.forEach(place => {markerBounds.extend(new maps.LatLng(place.gps.lat, place.gps.lng))})
  });

  markers.forEach((marker, i) => {
    marker.addListener('click', () => {
      infowindows[i].open(map, marker);
    });
  });

  map.setCenter(markerBounds.getCenter());
  map.fitBounds(markerBounds);
};

class RouteMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    
        this.setState({ places: this.props.places });

  }

  render() {
    const { places } = this.state;

    return (
      <>
        {!isEmpty(places) ? (
          <GoogleMap
            defaultZoom={8}
            defaultCenter={this.props.currentLocation}
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAPS_API }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, places)}
          />
        ):(
          <Spinner/>
        )}
      </>
    );
  }
}

// InfoWindow.propTypes = {
//   place: PropTypes.shape({
//     id: PropTypes.number,
//     title: PropTypes.string,    
//     info: PropTypes.string,
//     date: PropTypes.string,
//     time: PropTypes.string,
//     gps: PropTypes.shape({
//       lat: PropTypes.number,
//       lng: PropTypes.number
//     }),
//     location: PropTypes.shape({
//       address: PropTypes.string,
//       city: PropTypes.string,
//       state: PropTypes.string,
//       country: PropTypes.string
//     }),
//   }).isRequired,
// };


// Marker.propTypes = {
//   place: PropTypes.shape({
//     id: PropTypes.number,
//     title: PropTypes.string,    
//     info: PropTypes.string,
//     date: PropTypes.string,
//     time: PropTypes.string,
//     gps: PropTypes.shape({
//       lat: PropTypes.number,
//       lng: PropTypes.number
//     }),
//     location: PropTypes.shape({
//       address: PropTypes.string,
//       city: PropTypes.string,
//       state: PropTypes.string,
//       country: PropTypes.string
//     }),
//   }).isRequired,
// };


export default RouteMap;