import React from 'react';
import MapContainer from "../../components/Map/MapLogic";

export default function MapRoute(props) {
    
    const markers = (props.data.map((singleEntry) => singleEntry.gps ));
    const locations = (props.data.map((singleEntry) => singleEntry.location.city ));
    const mapStyles = {width: '100%', height: '100%'};
    return (
        <React.Fragment>
            <div>
                <MapContainer mapSize={mapStyles} locationArray={markers} infoWindows={locations}/>
            </div>
        </React.Fragment>  
    );
}
