import React, { Component } from 'react';
import MapContainer from "../Components/GPSCollection";

export default class MapRoute extends Component{
    render (){
        return (
            <React.Fragment>
                <div>
                    <MapContainer/>
                </div>
            </React.Fragment>  
        );
    }
}
