import React, { useEffect, useState } from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';

const MapContainer = (props) => {
        
    const [showingInfoWindow, setShowingInfoWindow] = useState(true);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});
    const [bounds, setBounds] = useState({});

    useEffect(() => {
        
          findBounds();
        
      }, []);

    const onMapClicked = (props) => {
        if (showingInfoWindow) {
            setShowingInfoWindow(false)
            setActiveMarker(null)
          }
      };

    const onMarkerClick = (props, marker, e) => {
            setSelectedPlace(props);
            setActiveMarker(marker);
            setShowingInfoWindow(true);
        };
    const onClose = props => {
        if (showingInfoWindow){
                setShowingInfoWindow(false);
                setActiveMarker(null);
        }
    };
    const displayMarkers = () => {

            return props.locationArray.map((store, index) => {
                return <Marker  key={index} 
                                id={index} 
                                position={store}
                                onClick={() => onMarkerClick()} 
                                name={'Current Location'} />
            })
    };
    const displayInfoWindow = () => {
       
            return props.infoWindows.map((store, index) => {
                return <InfoWindow  location={props.locationArray[index]} 
                                    visible={showingInfoWindow} 
                                    onClose={onClose()}
                                    name={store}
                                    key={index}>
                <div>
                    <h4>{store}</h4>
                </div>
                </InfoWindow>
          })  
    }

    const findBounds = () => {
        var locations = props.locationArray.map(loc => ({ lat: Number(loc.lat),
                                                        lng: Number(loc.lng)}))
        var bounds = new props.google.maps.LatLngBounds();
        locations.map(loc => bounds.extend(loc))
        setBounds(bounds)
    }
      
    return(
        <div>
            <Map
                    google={props.google}
                    // onClick={onMapClicked()}
                    style={props.mapSize} 
                    initialCenter={{ lat: -27.572544, 
                                    lng: -48.424597}}
                    bounds={bounds}
                    >
                
                    {displayMarkers()}
                    {displayInfoWindow()}

                </Map>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAu9sMNLJ0_hfvGG23wyP-IUDDVks8eGKI'
})(MapContainer);