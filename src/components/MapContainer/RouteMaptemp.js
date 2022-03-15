import React, { Component } from 'react';
import isEmpty from 'lodash.isempty';

// examples:
import GoogleMapReact from 'google-map-react';

// consts: [34.0522, -118.2437]

const getInfoWindowString = (place) => `
    <div>
      <div style="font-size: 16px;">
        ${place.title}
      </div>
      <div style="font-size: 14px;">
        <span style="color: grey;">
        ${place.date}
        </span>
      </div>
      <div style="font-size: 14px; color: grey;">
        ${place.location.address}
      </div>
    </div>`;

// Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
const handleApiLoaded = (map, maps, places) => {
  const markers = [];
  const infowindows = [];

  places.map((place) => {
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

  markers.map((marker, i) => {
    marker.addListener('click', () => {
      infowindows[i].open(map, marker);
    });
  });
};

class RouteMap1 extends Component {
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
        {!isEmpty(places) && (
          <GoogleMapReact
            defaultZoom={10}
            center={this.props.currentLocation}
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAPS_API }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, places)}
          />
        )}
      </>
    );
  }
}

export default RouteMap1;