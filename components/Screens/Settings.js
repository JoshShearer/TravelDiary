import React, { Component } from 'react';
import styled from "styled-components";

/*Current settings ideas
1. GPS logging frequency 1, 5,15, 30, 2H
2. Theme Dark, Light, Ext
3. Backup - Local/Cloud
    Folder/Location Access
4. 
*/
const Comp = styled.div `
  background: papayawhip;
`;

export default class Settings extends Component{
    render (){
        return (
            <Comp>
                <h1>GPS logging Frequency</h1>
                <h1>Theme</h1>
                <h1>Backup to Cloud</h1>
                <h1>Others</h1>
            </Comp>
        );
    }
}