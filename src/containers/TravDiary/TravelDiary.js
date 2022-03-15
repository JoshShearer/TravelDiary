import React, { useEffect } from 'react';

// import './TravelDiary.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
// import Splash from "../../Screens/Splash";
// import Settings from "../../Screens/Settings";
import NewEntry from "../../Screens/NewEntry/NewEntry";
import MapRoute from "../../Screens/MapRoute";
import Home from "../../Screens/Home";
import Entries from "../../Screens/Entries/Entries";
// import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import DataHandling from "../../components/DataHandling/DataHandling";
// import {CurrentLocation} from "../../components/LocationUpdate/CurrentLocation";
// import LoginPage from "../../Screens/LoginPage/LoginPage";
// import SignUp from "../../Screens/SignUpPage/SignUpPage";
// import styled from "styled-components";
import { useEntries } from './EntryContext';



// import LocationContext from './LocationContext';
// import newEntryContext from './NewEntryContext';
// import EntryContext from './EntryContext';
// import PhotoContext from './PhotoContext';

export default function TravelDiary () {

  const[entryData, setEntryData] = useEntries();

  useEffect(() => {

      DataHandling([],[entryData, setEntryData], 'Get');
 
  },[entryData])
  
  
  return (
        
        <Router>
         {/* {!this.state.auth ? (
            <Routes> 
              <Route path="/signup" element={ <SignUp />}/> 
              <Route  exact path="/login" element={ <LoginPage />}/>
            </Routes>
          ):( */}
           <div className="TravelDiary">              
              
                {/* <DataHandling /> */}
                <Routes>                 
                  <Route path="/route" element={ <MapRoute />}/>
                  {/* <Route path="/splash" element={<Splash />}/>
                  <Route path="/settings" element={<Settings />}/> */}
                  <Route path="/newEntry" element={ <NewEntry />}/>        
                  <Route path="/entries" element={ <Entries />}/>
                  <Route exact path="/" element={ <Home/>}/>
                </Routes>
              
              <Footer/>
          </div>
          )
        </Router>

      );
}
