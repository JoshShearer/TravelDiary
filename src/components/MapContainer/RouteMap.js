import React, { Component } from 'react';
import isEmpty from 'lodash.isempty';

// examples:
import GoogleMap from '../MapContainer/GoogleMap';
import Spinner from '../Spinner/LoadingSpinner';
// consts: [34.0522, -118.2437]

const getInfoWindowString = (place) => `
    <div>
      <div style="font-size: 16px;">
        ${place.title}
      </div>
      <div style="font-size: 14px;">       
        ${place.date}
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
  });

  markers.forEach((marker, i) => {
    marker.addListener('click', () => {
      infowindows[i].open(map, marker);
    });
  });
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
            defaultZoom={10}
            center={this.props.currentLocation}
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

export default RouteMap;