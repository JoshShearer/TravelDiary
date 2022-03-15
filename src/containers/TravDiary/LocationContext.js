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
    
    return (
        <LocationContext.Provider value={[loc, updateLocation]}>
            {children}
        </LocationContext.Provider>
    )
}