import React, { forwardRef, useEffect } from 'react';
import DataContainer from "../../components/EntryContainer/EntryContainer";
import Slide from "@mui/material/Slide";
import isEmpty from 'lodash.isempty';
import NoEntriesModal from "../../components/Modal/NoEntriesModal"
// import dummyEntries from '../../data/populate';
import { useEntries } from '../../containers/TravDiary/EntryContext';
import DataHandling from '../../components/DataHandling/DataHandling';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";


function Entries() {  

  const [entryData, setEntryData] = useEntries();

  useEffect(() => {
    LoadData();
  },[entryData])

  const removeEntry = (Entry) => {
    DataHandling(Entry, [entryData,setEntryData], 'Delete')
  }

  function LoadData() {
  DataHandling([], [entryData,setEntryData], 'Get');
  }

  // const dEntries = dummyEntries();

  return (
    <div>
        {!isEmpty(entryData) ? (
          entryData.map((singleEntry, key) => (
            <DataContainer
              data={singleEntry}
              key={key}
              remove={removeEntry}
            />
          ))
        ) : (
          <NoEntriesModal/>
        )}
    </div>
  );
}

export default Entries;