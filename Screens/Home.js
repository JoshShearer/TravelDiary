import React, { Component } from 'react';
import MapContainer from "../Components/GPSCollection";
import styled from "styled-components";

export default class Home extends Component{
    render (){
        return (
            
            <React.Fragment>
                <div>
                    <MapContainer/>
                </div>
            </React.Fragment>            
        );
    }
};

