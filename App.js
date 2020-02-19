import React, { Component, Fragment } from 'react';
import './App.css';
import TravelDiary from './containers/TravDiary/TravelDiary';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  
  render(){
    
    return (
        <Fragment>
         {console.log("Loading TravelDiary")}
          <TravelDiary/>
        </Fragment>
      );
  }
}

export default App;
/*
Screen Definitions
Splash => Home => Settings/Add Entry/All Entries

*/
