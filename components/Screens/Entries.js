import React, { useState, useEffect } from 'react';
import DataContainer from "../EntryContainer/EntryContainer";
import axios from 'axios';
import styled from 'styled-components';

const Component = styled.div `
  background: papayawhip;
`
 export default function Entries(props) {  

  
    return (
        <Component>
            {props.EntryData ? (
                (props.EntryData.map((singleEntry) =>
                    <DataContainer data={singleEntry} key={singleEntry.id}/>
                ))
            ) : (
                <h1>No Entries.  Start Diary now.  Select Add Entry Below. i need to make this much longer in the event that it is covered up by the header</h1>
            )}
        </Component>

    );
   
}


