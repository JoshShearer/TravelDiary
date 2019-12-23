import React, { useState } from 'react';
//import View from 'react-view-component';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Splash from "./Screens/Splash";
import Settings from "./Screens/Settings";
import NewEntry from "./Screens/NewEntry";
import Home from "./Screens/Home";
import Entries from "./Screens/Entries";



class App extends React.Component {
  render(){
  return (
      <React.Fragment>
        <Switch>
          <Route path="/" component={Splash}/>
          <Route path="/" component={Settings}/>
          <Route path="/" component={NewEntry}/>        
          <Route path="/" component={Home}/>
          <Route path="/" component={Entries}/>
        </Switch>
      </React.Fragment>
    /* <div className="App">
			<h1>Josh Shearer</h1>
			<p>
				This is my very first application using react.  The purpose is to develope a travel diary application to log 
				GPS tracks during a trip as well as capture some photos and thoughts associated with those locations as 
				a personal Journal/blog.
			</p>
      <ul>
        <li>New Zealand</li>
        <li>Africa</li>
        <li>SouthEast Asia</li>
        <li>And...don't forget Europe</li>
      </ul>
    </div> */
    );
  }
}

export default App;
/*
Screen Definitions
Splash => Home => Settings/Add Entry/All Entries

*/