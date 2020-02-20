import React, { Component } from 'react';
import MapContainer from "../../components/Map/GPSCollection";

export default class Home extends Component{

    render (){
        const mapStyles = {width: '100%', height: '100%'}
        const currentLocation = this.props.currentLocation.gps;
        
        return (
            
            <React.Fragment>
                <div>
                    <MapContainer MapSize={mapStyles} location={currentLocation}/>
                </div>
            </React.Fragment>            
        );
    }
};

