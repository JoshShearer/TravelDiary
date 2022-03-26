import React, { Component, Fragment } from 'react';
import TravelDiary from './containers/TravDiary/TravelDiary';
import { LocationProvider } from './containers/TravDiary/LocationContext';
import { EntryProvider } from './containers/TravDiary/EntryContext';
import { AuthProvider } from './containers/TravDiary/AuthContext';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./assets/theme";

class App extends Component {
  
  render(){
    
    return (
        <Fragment>
          <ThemeProvider theme={theme}>
          <CssBaseline/>
            <AuthProvider>
              <EntryProvider>
                <LocationProvider>
                    <TravelDiary/>
                </LocationProvider>
              </EntryProvider>
            </AuthProvider>
          </ThemeProvider>
        </Fragment>
      );
  }
}

export default App;