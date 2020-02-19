import React, { Component } from 'react';
// import './TravelDiary.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Splash from "../../components/Screens/Splash";
import Settings from "../../components/Screens/Settings";
// import NewEntry from "../../components/Screens/NewEntry/NewEntry";
// import MapRoute from "../../components/Screens/MapRoute";
import Home from "../../components/Screens/Home";
import Entries from "../../components/Screens/Entries";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import DataHandling from "../../components/DataHandling/DataHandling"
import CurrentLocation from "../../components/LocationUpdate/currentLocation"
// import styled from "styled-components";
import LoadingSpinner from '../../components/Loading/LoadingSpinner';



class TravelDiary extends Component {
  constructor(){
    super();
    this.getCurrentLocationHandler = this.getCurrentLocationHandler.bind(this);
    this.addNewEntryHandler = this.addNewEntryHandler.bind(this);
    this.getAllEntriesFromDB = this.getAllEntriesFromDB.bind(this);

    this.state = {
      currentLocation:{   
        gps: {lat: '39.005513',
              lng: '-115.089849'},
        neighborhood: "",
        city: "",
        state: "",
        country: ""
      },
      loading: true,
      entryData: [],
      newEntryData: {
        title: "",
        info: "",
        images: [],
        imageType:[],
        date: "",
        time: "",
        gps: {}        
      },
      intervalIsSet: false,
      files: [
        {
         id: "",
         name: "",
         type: "",
         size: 0,
         metadata: {
             resize: {
                 mode: "",
                 size: {
                     width: 0,
                     height: 0
                 }
             },
             crop: {
                 rect: {
                     x: 0,
                     y: 0,
                     width: 0,
                     height: 0
                 },
                 aspectRatio: 1
             }
         },
         data: ""
         }
        ],
        fileUploaded: false
    };
  }
  

  getCurrentLocationHandler = (cLocation) => {
    this.setState({ loading: true }, () => {
      this.setState({currentLocation: cLocation})
      this.setState({ loading: false})
    });
    
  }

  addImages = () => {

  }
  addNewEntryHandler = (EData) => {
    this.setState({newEntryData:EData})
  }
  getAllEntriesFromDB = (allData) => {
    this.setState({entryData:allData})
  }
  addEntryToDB = () => {

  }

  render(){
    // const loading = this.state.loading;
    // const cLocation = this.state.currentLocation;
    // console.log(loading);
    // console.dir(cLocation);
        // this.getAllEntriesFromDB()
        
        return (
        
        <Router>
          <div className="TravelDiary">
          {console.log('loaded TravelDiary')}
            {/* <LocationRequest/> */}
            <CurrentLocation DataPass={this.getCurrentLocationHandler}/>
            {/* <DataHandling EData={this.getAllEntriesFromDB}/> */}
            <Header/>
            {this.state.loading ? <LoadingSpinner /> : 
              <Switch>
                {/* <PropsRoute exact path="/" component={Home} location={cLocation.gps}/> */}
                {/* <Route exact path="/" component={Home}/> */}
                <Route exact path="/" render={(routeProps) => <Home {...routeProps} {...this.state.currentLocation}/>}/>
                {/* <Route 
                  path="/route" 
                  component={MapRoute}/> */}
                <Route path="/splash" component={Splash}/>
                <Route path="/settings" component={Settings}/>
                {/* <Route 
                  path="/newEntry" 
                  render={(routeProps) => <NewEntry {...routeProps} {...this.state.currentLocation} {...'newData={this.addNewEntryHandler}'}/>}/>         */}
                <Route 
                  path="/entries" 
                  render={(routeProps) => <Entries {...routeProps} {...this.state.entryData}/>}/>
              </Switch>
            }
            <Footer/>
          </div>
        </Router>
      );
  }
}

export default TravelDiary;
/*
Screen Definitions
Splash => Home => Settings/Add Entry/All Entries

*/
