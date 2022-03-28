import React, { useEffect, useCallback } from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import NewEntry from "../../Screens/NewEntry/NewEntry";
import MapRoute from "../../Screens/MapRoute";
import Home from "../../Screens/Home";
import Entries from "../../Screens/Entries/Entries";
import Footer from "../../components/Footer/Footer";
import { useLocation } from './LocationContext';
import { useEntries } from './EntryContext';
import { useAuth } from './AuthContext';
import { getDataFromDb } from '../../components/DataHandling/DataHandling';


export default function TravelDiary () {
  // var nav = useNavigate();
  const[entryData, setEntryData] = useEntries();
  const[auth, setAuth] = useAuth();
  const[loc, ] = useLocation();

  useEffect(() => {

      const Data = getDataFromDb()
        .then((data)=>{
          console.log("async Data Get", data)
          if(JSON.stringify(entryData) !== JSON.stringify(data)){
            setEntryData(data);
        }})
        .catch((error=> {
          console.log("DataHandling Error ", error.message)
        }))
      
      
      setAuth({verfied: false,
               unique_ID: "",
               userName: ""});
 
  },[entryData])
  
  return (
        
        <Router >
         {/* {!auth.verified ? (
            <Routes> 
              <Route path="/signup" element={ <SignUp />}/> 
              <Route  path="/" exact element={ <LoginPage />}/>
            </Routes>
          ):( */}
           <div className="TravelDiary">
                  {loc && 'location' in loc ?
                  <Routes>
                    <Route path="/route" element={ <MapRoute />}/>
                    <Route path="/newEntry" element={ <NewEntry />}/>        
                    <Route path="/entries" element={ <Entries />}/>
                    <Route exact path="/" element={ <Home />}/>
                  </Routes> :
                  <Routes>                    
                    <Route exact path="/" element={ <Home />}/>
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes> }
              <Footer/>
          </div>
          {/* )} */}
        </Router>

      );
}
