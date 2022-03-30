import React, { useEffect} from 'react';
import { useEntries } from '../containers/TravDiary/EntryContext';
import { useLocation } from '../containers/TravDiary/LocationContext';
import MapHome from "../components/MapContainer/RouteMap";
import Spinner from '../components/Spinner/LoadingSpinner';
import NoEntriesModal from '../components/Modal/NoEntriesModal';
import isEmpty from 'lodash.isempty';

function MapRoute() {

    const [entryData, setEntryData] = useEntries();
    const [cLocation, ] = useLocation();
    const currentLocation = entryData[Math.round(entryData.length/2)]

    return (
        <React.Fragment>
            <div style={{ height: '97vh', width: '100%' }}>
                {!isEmpty(currentLocation) ?
                <MapHome  places={entryData} currentLocation={currentLocation.gps}/>
                : <NoEntriesModal/>}
            </div>
        </React.Fragment>  
    );
};

export default MapRoute;