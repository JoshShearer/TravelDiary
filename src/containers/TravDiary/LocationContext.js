import React, { createContext, useContext, useState } from "react";

const LocationContext = createContext();

// const initLoc = ({   
//                     gps:    {lat: "",
//                              lng: ""},
//                     location: { neighborhood: "",
//                                 city: "",
//                                 state: "",
//                                 country: "",
//                                 county: ''}
//                             })

export function useLocation(){
    return useContext(LocationContext)
}

export function LocationProvider({ children }) {
    const [loc, setLoc] = useState()

    function updateLocation(nLocation){
        setLoc(nLocation)
        console.log("set Location", nLocation)        
    }
    function setLocation(nLocation){
        setLoc(nLocation)
        localStorage.setItem('locationData', JSON.stringify(nLocation))
    }
    
    return (
        <LocationContext.Provider value={[loc, updateLocation, setLocation]}>
            {children}
        </LocationContext.Provider>
    )
}