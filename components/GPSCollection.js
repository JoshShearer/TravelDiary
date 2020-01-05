import React, { Component } from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import CurrentLocation from './Map';

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class MapContainer extends Component{
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    onClose = props => {
        if (this.state.showingInfoWindow){
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
    
    render() {
        return(
            // <CurrentLocation
            // centerAroundCurrentLocation
            // google={this.props.google}
            // // >
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles} 
                initialCenter={{
                lat: 36.174305,
                lng: -115.154568
                }}>
            
                <Marker onClick={this.onMarkerClick} name={'Current Location'}/>
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                    >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            {/* </CurrentLocation> */}
            </Map> 
        );
    }
}
// export class MapContainer extends Component {
//     render() {
//       return (
//         <Map
//           google={this.props.google}
//           zoom={14}
//           style={mapStyles}
//           initialCenter={{
//            lat: 36.174305,
//            lng: -115.154568
//           }}
//         />
//       );
//     }
//   }

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAu9sMNLJ0_hfvGG23wyP-IUDDVks8eGKI'
})(MapContainer);