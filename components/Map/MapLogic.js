import React, { useEffect, useState, forwardRef } from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import Slide from "@material-ui/core/Slide";
import RouteModal from "../../components/Modal/RouteModal"

const MapContainer = React.memo(function MapContainer(props) {
        
    const [showingInfoWindow, setShowingInfoWindow] = useState(true);
    const [, setActiveMarker] = useState({});
    const [, setSelectedPlace] = useState({});
    const [bounds, setBounds] = useState({});

    useEffect(() => {
        
          findBounds();
        
      }, []);


    const onMarkerClick = (props, marker) => {
            setSelectedPlace(props);
            setActiveMarker(marker);
            setShowingInfoWindow(true);
        };
    const onClose = () => {
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


    const Transition = forwardRef(function Transition(props, ref) {
        return <Slide direction="down" ref={ref} {...props} />;
        });
        
        Transition.displayName = "Transition";
        
    }
      
    return(
        <div>
         {bounds.length ? (
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
                ) : (
            <div>
                <Map
                    google={props.google}
                    // onClick={onMapClicked()}
                    style={props.mapSize} 
                    initialCenter={props.currentLocation.gps}
                    >
                    <Marker onClick={props.currentLocation.city} name={props.currentLocation.city} />
                    <InfoWindow
                        marker={props.currentLocation.city}
                        visible="true"
                        // onClose={this.onClose}
                        >
                        <div>
                            <h4>{props.currentLocation.city}</h4>
                        </div>
                    </InfoWindow>
                </Map>
                <RouteModal/>
            </div>
      )}
        </div>
    );
});

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAu9sMNLJ0_hfvGG23wyP-IUDDVks8eGKI'
})(MapContainer);