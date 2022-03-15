import React, { useEffect} from 'react';
import { useEntries } from '../containers/TravDiary/EntryContext';
import { useLocation } from '../containers/TravDiary/LocationContext';
import MapHome from "./../components/MapContainer/RouteMap";
import DataHandling from '../components/DataHandling/DataHandling';
import Spinner from '../components/Spinner/LoadingSpinner';
import isEmpty from 'lodash.isempty';

function MapRoute() {

    const [entryData, setEntryData] = useEntries();
    const [cLocation, ] = useLocation();
    const currentLocation = entryData[Math.round(entryData.length/2)]

    useEffect(() => {
        LoadData();
      },[entryData])
       
      function LoadData() {
      DataHandling([], [entryData,setEntryData], 'Get');
      }
   
   
    // const jsonEntry = [];
    // const markers = (props.data.map((singleEntry) => singleEntry.gps ));
    // const locations = (props.data.map((singleEntry) => singleEntry.location.city ));
    // entryData.map((entry) => {
    //     jsonEntry.push(JSON.stringify(entry))
    //     console.log(JSON.stringify(entry))
    // });
    // // if (!areEqual){
    // //     setMarkers(props.data.map((singleEntry) => singleEntry.gps ));
    // //     setLocations(props.data.map((singleEntry) => singleEntry.location.city ));
    // // }
    console.log("MapRoute Data",entryData);
    console.log("MapRoute LData",cLocation)
    return (
        <React.Fragment>
            <div>
                {!isEmpty(currentLocation) ?
                <MapHome  places={entryData} currentLocation={currentLocation.gps}/>
                : <Spinner/>}
            </div>
        </React.Fragment>  
    );
};

export default MapRoute;