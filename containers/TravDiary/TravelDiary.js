import React, { Component } from 'react';
import throttle from 'lodash.throttle';
// import './TravelDiary.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Splash from "../../components/Screens/Splash";
import Settings from "../../components/Screens/Settings";
import NewEntry from "../../components/Screens/NewEntry/NewEntry";
import MapRoute from "../../components/Screens/MapRoute";
import Home from "../../components/Screens/Home";
import Entries from "../../components/Screens/Entries";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import DataHandling from "../../components/DataHandling/DataHandling";
import CurrentLocation from "../../components/LocationUpdate/currentLocation";

// import styled from "styled-components";
import LoadingSpinner from '../../components/Loading/LoadingSpinner';



class TravelDiary extends Component {
  constructor(){
    super();
    this.getCurrentLocationHandler = this.getCurrentLocationHandler.bind(this);
    this.addNewEntryHandler = this.addNewEntryHandler.bind(this);
    this.getAllEntriesFromDB = this.getAllEntriesFromDB.bind(this);
    this.getAllEntriesFromDBThrottled = throttle(this.getAllEntriesFromDB,2000)
    this.deleteEntryHandler = this.deleteEntryHandler.bind(this);

    this.state = {
      currentLocation:{   
        gps: {lat: '',
              lng: ''},
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
        gps: {},
        location: {}        
      },
      intervalIsSet: false,
      // files: [
      //   {
      //    id: "",
      //    name: "",
      //    type: "",
      //    size: 0,
      //    metadata: {
      //        resize: {
      //            mode: "",
      //            size: {
      //                width: 0,
      //                height: 0
      //            }
      //        },
      //        crop: {
      //            rect: {
      //                x: 0,
      //                y: 0,
      //                width: 0,
      //                height: 0
      //            },
      //            aspectRatio: 1
      //        }
      //    },
      //    data: ""
      //    }
      //   ],
        dataSettled: false,
        entryHandled: true,
        dataCaptured: true,
        fileDeleted: true,
        idToDelete: 0,
        dbOperation: "Get"
    };
  }
  componentDidMount(){
    this.setState({loading: false})
  }

  // componentDidUpdate(prevState){
  //   if (prevState.entryData !== this.state.entryData){
  //       this.getAllEntriesFromDB(this.state.entryData);
  //   }
  // }
  getCurrentLocationHandler = (cLocation) => {
    this.setState({ loading: true }, () => {
      this.setState({currentLocation: cLocation})
      this.setState({ loading: false})
    }); 
  }
  finishLoadingHandler = (setLoading) => {
    this.setState({dataLoading:setLoading})
  }
  dataLocationHandler = (Data) => {
    this.setState({ loading: true }, () => {
      this.setState({ currentLocation: Data,
                      loading: false})
    }); 
    }
  addNewEntryHandler = (EData) => {
    this.setState({ dataSettled: false, 
                    dbOperation: "Put",
                    newEntryData: EData,
                    dataCaptured: false});
  }
  getAllEntriesFromDB = (allData) => {
    if (!this.state.dataSettled){
      if (allData){
        this.setState({entryData:allData});
        this.checkSettled(allData);
      } else{//, () => {
        this.checkSettled(allData);
    }
  }}
  deleteEntryHandler = (idToDelete) => {
    this.setState({ dataSettled: false , 
                    dbOperation: "Delete",
                    fileDeleted: false, 
                    idToDelete: idToDelete});
    this.checkSettled();
  }
  checkSettled (allData) {
    if (!this.state.dataSettled){
      if (!this.state.fileDeleted){   //check entry removed
        this.setState({ fileDeleted: true,
                        dataSettled: true,
                        entryHandled: true})
      } else if (!this.state.dataCaptured) { //Check new entry added
        if(this.state.entryData[this.state.entryData.length-1].time == this.state.newEntryData.time ){
          this.setState({  dataCaptured: true,
                           dataSettled: true,
                           entryHandled: true})
        }
      }
      else{
        this.setState({ dataSettled: true})
      }
    }
  }

  render(){

        return (
        
        <Router>
          <div className="TravelDiary">
          {console.log('loaded TravelDiary')}
            <CurrentLocation DataPass={this.getCurrentLocationHandler}/>
            {this.state.fileDeleted && this.state.dataCaptured ? (
              <DataHandling EData={this.getAllEntriesFromDB} op="Get"/>
              ):(
              <DataHandling newData={this.state.newEntryData} op={this.state.dbOperation} entryData={this.state.entryData} idToDelete={this.state.idToDelete}/>
              )
            }
            <Header/>
            {this.state.loading ? <LoadingSpinner /> : 
              <Switch>
                <Route exact path="/" render={(routeProps) => <Home {...routeProps} 
                                                              currentLocation={this.state.currentLocation}/>}/>
                <Route 
                  path="/route" 
                  render={(routeProps) => <MapRoute {...routeProps} 
                                           data={this.state.entryData}/>}/>
                <Route path="/splash" component={Splash}/>
                <Route path="/settings" component={Settings}/>
                <Route 
                  path="/newEntry" 
                  render={(routeProps) => <NewEntry {...routeProps} 
                                            currentLocation={this.state.currentLocation} 
                                            newData={this.addNewEntryHandler}/>}/>        
                <Route 
                  path="/entries" 
                  render={(routeProps) => <Entries {...routeProps} 
                                            entryData={this.state.entryData} 
                                            remove={this.deleteEntryHandler}
                                            />}/>
              </Switch>
            }
            <Footer/>
          </div>
        </Router>
      );
  }
}

export default TravelDiary;
