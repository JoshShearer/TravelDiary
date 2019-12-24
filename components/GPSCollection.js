import React, { Component } from 'react';
import {GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
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
    onMarkerClickEventHandler = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    onCloseEventHandler = props => {
        if (this.state.showingInfoWindow){
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };
    
    render() {
        return(
            <CurrentLocation
            centerArounCurrentLocation
            google={this.props.google}
            >
                <Marker onClick={this.onMarkerClickEventHandler} name={'Current Location'}/>
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onCloseEventHandler={this.onCloseEventHandler}
                    >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </CurrentLocation>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAu9sMNLJ0_hfvGG23wyP-IUDDVks8eGKI'
})(MapContainer);