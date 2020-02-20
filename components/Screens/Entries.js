import React from 'react';
import DataContainer from "../EntryContainer/EntryContainer";
import styled from 'styled-components';

const Component = styled.div `
  background: papayawhip;
`
function Entries(props) {  

  
    return (
        <Component>
            {props.entryData ? (
                (props.entryData.map((singleEntry) =>
                    <DataContainer data={singleEntry} key={singleEntry.id}/>
                ))
            ) : (
                <h1>No Entries.  Start Diary now.  Select Add Entry Below. </h1>
            )}
        </Component>

    );
}
// function propChange(prevProps, nextProps) {
//     const lastIndex = nextProps.entryData.length - 1
//     return nextProps.newEntry.time === nextProps.entryData[lastIndex].time
// }

//  export default React.memo(Entries, propChange);
 export default Entries;