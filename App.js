import React, { Component, Fragment } from 'react';
import './App.css';
import TravelDiary from './containers/TravDiary/TravelDiary';

class App extends Component {
  
  render(){
    
    return (
        <Fragment>
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
