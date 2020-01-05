import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import Splash from "./Screens/Splash";
import Settings from "./Screens/Settings";
import NewEntry from "./Screens/NewEntry";
import MapRoute from "./Screens/MapRoute";
import Home from "./Screens/Home";
import Entries from "./Screens/Entries";
import Header from "./Components/Header";
import Footer from "./Components/Footer";


class App extends Component {
  render(){
  return (
      <Router>
        <div className="App">
          <Header/>
          <Switch>
            <Route path="/" exact component={Home}/> 
            <Route path="/route" component={MapRoute}/>
            <Route path="/splash" component={Splash}/>
            <Route path="/settings" component={Settings}/>
            <Route path="/newEntry" component={NewEntry}/>        
            <Route path="/entries" component={Entries}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
/*
Screen Definitions
Splash => Home => Settings/Add Entry/All Entries

*/