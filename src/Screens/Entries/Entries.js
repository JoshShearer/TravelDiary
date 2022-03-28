import React, { forwardRef, useEffect } from 'react';
import DataContainer from "../../components/EntryContainer/EntryContainer";
import Slide from "@mui/material/Slide";
import isEmpty from 'lodash.isempty';
import NoEntriesModal from "../../components/Modal/NoEntriesModal"
// import dummyEntries from '../../data/populate';
import { useEntries } from '../../containers/TravDiary/EntryContext';
import { deleteFromDB, getDataFromDb, updateDB } from '../../components/DataHandling/DataHandling';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";


function Entries() {  

  const [entryData, setEntryData] = useEntries();

  useEffect(() => {
    LoadData();
  },[updateEntry,removeEntry])

  const removeEntry = (Entry) => {
    deleteFromDB(Entry.id, entryData)
    .then((data)=>{
      console.log("DeleteComplete ", data)
    })
    .catch((error)=> {
      console.log("DeleteFail ", error)
    })
    setEntryData([]);
  }

  const updateEntry = (Entry) => {
    updateDB(Entry, entryData)
    .then((data)=>{
      console.log("Update Complete ", data)
    })
    .catch((error)=> {
      console.log("UpdateFail ", error)
    })
    setEntryData([]);
  }

  function LoadData() {
    const Data = getDataFromDb()
    .then((data)=>{
      console.log("async Data Get Entries", data)
      if(JSON.stringify(entryData) !== JSON.stringify(data)){
        setEntryData(data);
    }})
    .catch((error=> {
      console.log("DataHandling Error Entries", error.message)
    }))
  }

  return (
    <div>
        {!isEmpty(entryData) ? (
          entryData.map((singleEntry, key) => (
            <DataContainer
              data={singleEntry}
              key={key}
              remove={removeEntry}
              update={updateEntry}
            />
          ))
        ) : (
          <NoEntriesModal/>
        )}
    </div>
  );
}

export default Entries;