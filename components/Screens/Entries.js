import React from 'react';
import DataContainer from "../EntryContainer/EntryContainer";
import styled from 'styled-components';

function Entries(props) {  

  
    return (
        <div>
            {props.entryData.length ? (
                (props.entryData.map((singleEntry) =>
                    <DataContainer data={singleEntry} key={singleEntry.id} remove={props.remove}/>
                ))
            ) : (
                <h1>No Entries.  Start Diary now.  Select Add Entry Below. </h1>
            )}
        </div>

    );
}

 export default Entries;