import React, { Component, Fragment } from 'react';
import TravelDiary from './containers/TravDiary/TravelDiary';
import { LocationProvider } from './containers/TravDiary/LocationContext';
import { EntryProvider } from './containers/TravDiary/EntryContext'


class App extends Component {
  
  render(){
    
    return (
        <Fragment>
         {/* {console.log("Loading TravelDiary")} */}
          <EntryProvider>
            <LocationProvider>
                <TravelDiary/>
            </LocationProvider>
          </EntryProvider>
        </Fragment>
      );
  }
}

export default App;