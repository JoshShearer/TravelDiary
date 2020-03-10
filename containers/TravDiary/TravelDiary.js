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
import LoginPage from "../../components/Screens/LoginPage/LoginPage";
import SignUp from "../../components/Screens/SignUpPage/SignUpPage";
// import styled from "styled-components";
import LoadingSpinner from '../../components/Loading/LoadingSpinner';






class TravelDiary extends Component {
  constructor(){
    super();
    this.getCurrentLocationHandler = this.getCurrentLocationHandler.bind(this);
    this.addNewEntryHandler = this.addNewEntryHandler.bind(this);
    this.getAllEntriesFromDB = this.getAllEntriesFromDB.bind(this);
    this.getAllEntriesFromDBThrottled = throttle(this.getAllEntriesFromDB,3000)
    this.deleteEntryHandler = this.deleteEntryHandler.bind(this);

    this.state = {
      Auth: true,
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
        fileUploaded: false,
        deleteEntry: false,
        dataLoading: true,
        idToDelete: 0,
        dataUpdated: true,
        dbOperation: "Get"
    };
  }
  
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
      this.setState({currentLocation: Data})
      this.setState({ loading: false})
    }); 
    }
  addNewEntryHandler = (EData) => {
    this.setState({ fileUploaded: true, 
                    dbOperation: "Put",
                    newEntryData: EData,
                    dataUpdated:false}, () => {
      this.setState({ fileUploaded: false})
                    })
                  }
  
  getAllEntriesFromDB = (allData) => {
    this.setState({entryData:allData})
    //   if(this.state.loading){
  //       this.setState({entryData:allData})
  //       this.finishLoadingHandler(false)
  //   }else if (this.state.fileUploaded){
  //     this.setState({ entryData:allData,
  //                     fileUploaded:false,
  //                     dataUpdated:true})
  //   }
  }
  deleteEntryHandler = (idToDelete) => {
    this.setState({ fileUploaded: true, 
                    dbOperation: "Delete",
                    idToDelete: idToDelete,
                    dataUpdated: false}, () => {
      this.setState({ fileUploaded: false})
      })
    }
  render(){

        return (
        
        <Router>
         {!this.state.Auth ? (
            <div>
              <Route path="/signup" component={SignUp} />
              <Route exact path="/" component={LoginPage} />
            </div>
          ):(
           <div className="TravelDiary">              
              <CurrentLocation DataPass={this.getCurrentLocationHandler}/>
              {!this.state.fileUploaded ? (
                <DataHandling EData={this.getAllEntriesFromDBThrottled} op="Get"/>
                ):(
                <DataHandling newData={this.state.newEntryData} op={this.state.dbOperation} entryData={this.state.entryData} idToDelete={this.state.idToDelete}/>
                )
              }
              
              <Header/>
              {this.state.loading ? <LoadingSpinner /> : 
                <Switch>
                  <Route exact path="/home" render={(routeProps) => <Home {...routeProps} 
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
                                              newEntry={this.state.newEntryData}
                                              remove={this.deleteEntryHandler}
                                              />}/>
                </Switch>
              }
              <Footer/>
          </div>
          )}
        </Router>
      );
  }
}

export default TravelDiary;
