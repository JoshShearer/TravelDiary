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
        // LoadData();
        // const EntryUpdate = []
        // entryData.array.forEach(element => {
            
        // });
      },[entryData])
       
      function LoadData() {
      DataHandling([], [entryData,setEntryData], 'Get');
      }
   
    // console.log("MapRoute Data",entryData);
    // console.log("MapRoute LData",cLocation)
    return (
        <React.Fragment>
            <div style={{ height: '100vh', width: '100%' }}>
                {!isEmpty(currentLocation) ?
                <MapHome  places={entryData} currentLocation={currentLocation.gps}/>
                : <Spinner/>}
            </div>
        </React.Fragment>  
    );
};

export default MapRoute;