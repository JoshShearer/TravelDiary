import React, { Component } from 'react';

/*Current settings ideas
1. GPS logging frequency 1, 5,15, 30, 2H
2. Theme Dark, Light, Ext
3. Backup - Local/Cloud
    Folder/Location Access
4. 
*/

export default class Settings extends Component{
    render (){
        return (
            <div>
                <h1>GPS logging Frequency</h1>
                <h1>Theme</h1>
                <h1>Backup to Cloud</h1>
                <h1>Others</h1>
            </div>
        );
    }
}