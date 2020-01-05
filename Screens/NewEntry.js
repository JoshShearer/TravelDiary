import React, { Component } from 'react';
import styled from "styled-components";
import ButtonContainer from "../Components/Button";

export default class NewEntry extends Component{
        state = {
            selectedFile: null
        }
        fileSelectedHandler = event => {
            this.setState({
                selectedFile: event.target.files[0]
            })
        }
        dataEntryHandler = event => {
            console.log("Adding Entry Data to MongoDB")
        }

        render (){
        return (
            <div className="NewEntry">
                <h2>Journal Entry</h2>
                Record the moment
                <br/>
                <textarea cols="40" name="comments" rows="5"></textarea>
                <br/>
                Date:
                {cDate}
                <br/>
                Time:
                {cTime}
                <br/>
                Location:
                {cLocation}
                <br/>
                <br/>
                Add some photos!:
                <br/>
                <input type="file" multiple onChange={this.fileSelectedHandler}/>
                <br/><br/><br/><br/>
                <ButtonContainer onClick={this.dataEntryHandler}>Entry Finished</ButtonContainer>
                {/* <button className="button" onClick={this.dataEntryHandler}>Entry Finished</button> */}
            </div>
        );
    }
}

var cLocation = "wt4f";
function nLocation(){
    if (navigator.geolocation){
        function getLocation(position){
            return ("Lat: " + position.coords.latitude + " Long: " + position.coords.longitude);
        }
        navigator.geolocation.getCurrentPosition(getLocation);
        return getLocation;
    }
    else
    {
        return ("GPS is not enabled on this device");
    }
    return nLocation;
    // console.log(getLocation);
}

cLocation = nLocation();
var findDate = new Date();
var cDate = (findDate.getMonth()+1) + "-" + findDate.getDate() + "-" + findDate.getFullYear();
var cTime = findDate.getHours() + ":" + findDate.getMinutes() + ":" + findDate.getSeconds();

