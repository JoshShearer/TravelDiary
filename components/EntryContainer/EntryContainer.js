import React, { Component } from 'react';
import MapContainer from "../Map/GPSCollection";
// import CurrentLocation from "./Map";
import "./EntryContainer.css"
import styled from 'styled-components';


export default class DataContainer extends Component {

  render(){
    const mapStyles = {width: '25%', 
                       height: '20%'}
  
    const displayData = this.props.data;
    
    return (
      <div>
        <section>        
            <sidebar>
              <MapContainer   className="mapEntries" 
                              mapSize={mapStyles}  
                              location={displayData.gps} 
                              zoom={10}
                              static='true'/>
            </sidebar>
            <article>
            <h4>{displayData.title}</h4>
              <p>{displayData.info}<br/><br/>
                <br/>Date:{displayData.date}
                <br/>Time:{displayData.time}
                <br/></p>
                {displayData.location !== undefined ?
                  <p>Location:{displayData.location.city}</p>
                  : <p>Error: Trouble Finding Location</p>
              }
            </article>
        </section>
        <div>
          {displayData.images !== undefined ? 
            (displayData.images.map((image) => 
              <input type="file" class="filepond" name="cover"/>))
              // photo={image} imagePreview={true}/>))
              : <h1>No Photos Found</h1>
          }
          <br/>
        </div>
      </div>
    );
  }
}

//     id: Number,
//     title: String,
//     info: String,
//     image: [{type: Buffer}],  
//     imageType: [{type: String}],  
//     date: String,
//     time: String,
//     gps: {  lat: String,