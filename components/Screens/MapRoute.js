import React, { useState } from 'react';
import MapContainer from "../../components/Map/MapLogic";

const MapRoute = React.memo(function MapRoute(props) {
    
    const [markers, setMarkers] = useState(props.data.map((singleEntry) => singleEntry.gps ))
    const [locations, setLocations] = useState(props.data.map((singleEntry) => singleEntry.location.city ))

    // const markers = (props.data.map((singleEntry) => singleEntry.gps ));
    // const locations = (props.data.map((singleEntry) => singleEntry.location.city ));
    const mapStyles = {width: '100%', height: '100%'};

    if (!areEqual){
        setMarkers(props.data.map((singleEntry) => singleEntry.gps ));
        setLocations(props.data.map((singleEntry) => singleEntry.location.city ));
    }

    return (
        <React.Fragment>
            <div>
                <MapContainer mapSize={mapStyles} locationArray={markers} infoWindows={locations}/>
            </div>
        </React.Fragment>  
    );
});

function areEqual(prevProps, nextProps){
    return prevProps === nextProps;
}

// export default React.memo(MapRoute, areEqual);
export default MapRoute;