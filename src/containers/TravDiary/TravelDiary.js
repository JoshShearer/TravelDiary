import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createBrowserHistory } from "history";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Splash from "../../Screens/Splash";
// import Settings from "../../Screens/Settings";
import NewEntry from "../../Screens/NewEntry/NewEntry";
import MapRoute from "../../Screens/MapRoute";
import Home from "../../Screens/Home";
import Entries from "../../Screens/Entries/Entries";
import Footer from "../../components/Footer/Footer";
import DataHandling from "../../components/DataHandling/DataHandling";
import {CurrentLocation} from "../../components/LocationUpdate/CurrentLocation";
import LoginPage from "../../Screens/LoginPage/LoginPage";
import SignUp from "../../Screens/SignUpPage/SignUpPage";
// import styled from "styled-components";
import { useEntries } from './EntryContext';
import { useAuth } from './AuthContext';


export default function TravelDiary () {
  var hist = createBrowserHistory();
  const[entryData, setEntryData] = useEntries();
  const[auth, setAuth] = useAuth();

  useEffect(() => {

      DataHandling([],[entryData, setEntryData], 'Get');
      setAuth({verfied: false,
               unique_ID: "",
               userName: ""});
 
  },[entryData])
  
  CurrentLocation();
  return (
        
        <Router history={hist}>
         {/* {!auth.verified ? (
            <Routes> 
              <Route path="/signup" element={ <SignUp />}/> 
              <Route  path="/" exact element={ <LoginPage />}/>
            </Routes>
          ):( */}
           <div className="TravelDiary">              
                <Routes>                 
                  <Route path="/route" element={ <MapRoute />}/>
                  {/* <Route path="/splash" element={<Splash />}/>
                  <Route path="/settings" element={<Settings />}/> */}
                  <Route path="/newEntry" element={ <NewEntry />}/>        
                  <Route path="/entries" element={ <Entries />}/>
                  <Route exact path="/" element={ <Home />}/>
                </Routes>
              
              <Footer/>
          </div>
          {/* )} */}
        </Router>

      );
}
