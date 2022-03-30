import React, { createContext, useState, useContext } from "react";

const EntryContext = createContext();

export function useEntries () {
    return useContext(EntryContext);   
}
 

export function EntryProvider({children}) {
    
    const [entryTable, setEntryTable] = useState([]);
    // const [updateComplete, setUpdateComplete] = useState(false)

        return (
            
        <EntryContext.Provider value={[entryTable, setEntryTable]}>
            {children}
        </EntryContext.Provider>
    )
}