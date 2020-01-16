import React, { useState } from 'react';
import { connect } from 'react-redux';
import DataContainer from "../Components/EntryContainer";
import DataHandling from "../data/db/DataHandling";
import { useStore } from 'react-redux';

export default function Entries (props){  

    const stateChange='false'
    const data = DataHandling(stateChange);
    const storeData = useState();
    return (
        <div>
            {data.map(function(singleEntry){
                return <DataContainer data={singleEntry}/>
            })}
            <h1>Component needs to load</h1>
        </div>
    );
    }