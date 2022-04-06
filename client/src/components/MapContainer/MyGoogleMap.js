// MyGoogleMaps.js
import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

import styled from "styled-components";

// import AutoComplete from './Autocomplete';
import Marker from "./Marker";

const Wrapper = styled.div`
  width: 100%;
  height: 90%;
`;

const InfoDiv = styled.main`
  bottom-margin: 200px;
`;

class MyGoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      geoCoder: null,
      places: [],
      center: [],
      zoom: 9,
      address: "",
      draggable: true,
      lat: null,
      lng: null,
    };
  }

  componentDidMount() {
    // navigator.geolocation.getCurrentPosition((position) => {});
    const response = this.setCurrentLocation()
      .then((coords) => {
        if (coords !== null) {
          console.log("Geolocation Success");
          this.setState(coords);
        } else {
          console.log("Geolocation Permission Denied");
          this.setState({
            center: [37.80552, -122.3237437],
            lat: 37.80552,
            lng: -122.3237437,
          });
        }
      })
      .catch((error) => {
        console.log("Geoloction permission denied ", error.message);
        this.setState({
          center: [37.80552, -122.3237437],
          lat: 37.80552,
          lng: -122.3237437,
        });
      });
  }

  onMarkerInteraction = (childKey, childProps, mouse) => {
    this.setState({
      draggable: false,
      lat: mouse.lat,
      lng: mouse.lng,
    });
  };
  onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
    this.setState({ draggable: true });
    this._generateAddress();
  };

  onMarkerInteractionDblClick = (childKey, childProps, mouse) => {
    this._generateAddress();
  }

  _onChange = ({ center, zoom }) => {
    this.setState({
      center: center,
      zoom: zoom,
    });
  };

  _onClick = (value) => {
    this.setState({
      lat: value.lat,
      lng: value.lng,
    });
  };

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });

    this._generateAddress();
  };

  // addPlace = (place) => {
  //   this.setState({
  //     places: [place],
  //     lat: place.geometry.location.lat(),
  //     lng: place.geometry.location.lng(),
  //   });
  //   this._generateAddress();
  // };

  _generateAddress() {
    const { mapApi } = this.state;

    const geocoder = new mapApi.Geocoder();

    geocoder.geocode(
      { location: { lat: this.state.lat, lng: this.state.lng } },
      (results, status) => {
        console.log(results);
        console.log(status);
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.setState({ address: results[0].formatted_address });
            const addComps = results[0].address_components;
            this.props.locationUpdate({
              gps: { lat: this.state.lat, lng: this.state.lng },
              location: {
                address: results[0].formatted_address,
                city: Object.keys(addComps)
                  .filter(
                    (key) =>
                      addComps[key].types.filter(
                        (type) => type === "locality"
                      ) == "locality"
                  )
                  .map((key, index) => {
                    return addComps[key].long_name;
                  })[0],
                state: Object.keys(addComps)
                  .filter(
                    (key) =>
                      addComps[key].types.filter(
                        (type) => type === "administrative_area_level_1"
                      ) == "administrative_area_level_1"
                  )
                  .map((key, index) => {
                    return addComps[key].long_name;
                  })[0],
                country: Object.keys(addComps)
                  .filter(
                    (key) =>
                      addComps[key].types.filter(
                        (type) => type === "country"
                      ) == "country"
                  )
                  .map((key, index) => {
                    return addComps[key].long_name;
                  })[0],
              },
            });
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  // Get Current Location Coordinates
  setCurrentLocation() {
    return new Promise((resolve, reject) =>
      navigator.permissions
        ? navigator.permissions
            .query({
              name: "geolocation",
            })
            .then((permission) =>
              // is geolocation granted?
              permission.state === "granted"
                ? navigator.geolocation.getCurrentPosition((position) => {
                    resolve({
                      center: [
                        position.coords.latitude,
                        position.coords.longitude,
                      ],
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                    });
                  }) :
            
                // navigator.geolocation.getCurrentPosition((position) => {
                //     resolve({
                //       center: [
                //         position.coords.latitude,
                //         position.coords.longitude,
                //       ],
                //       lat: position.coords.latitude,
                //       lng: position.coords.longitude,
                //     });

                    resolve(null)
                  // })
            )
        : reject(new Error("Permission API is not supported"))
    );
  }

  render() {
    // const {
    //     places, mapApiLoaded, mapInstance, mapApi
    // } = this.state;

    return (
      <Wrapper>
        {/* {mapApiLoaded && (
                    <div>
                        <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />
                    </div>
                )} */}
        <GoogleMapReact
          center={this.state.center}
          zoom={this.state.zoom}
          draggable={this.state.draggable}
          onChange={this._onChange}
          onChildDblClick={this.onMarkerInteractionDblClick}
          onChildMouseDown={this.onMarkerInteraction}
          onChildMouseUp={this.onMarkerInteractionMouseUp}
          onChildMouseMove={this.onMarkerInteraction}
          onChildClick={() => console.log("child click")}
          onClick={this._onClick}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLEMAPS_API,
            libraries: ["places", "geometry"],
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
          <Marker
            text={this.state.address}
            lat={this.state.lat}
            lng={this.state.lng}
          />
        </GoogleMapReact>

        <InfoDiv className="info-wrapper">
          <div className="map-details">
            Latitude: <span>{this.state.lat}</span>, Longitude:{" "}
            <span>{this.state.lng}</span>
          </div>
          <div className="map-details">
            Zoom: <span>{this.state.zoom}</span>
          </div>
          <div className="map-details">
            Address: <span>{this.state.address}</span>
          </div>
        </InfoDiv>
      </Wrapper>
    );
  }
}

export default MyGoogleMap;
