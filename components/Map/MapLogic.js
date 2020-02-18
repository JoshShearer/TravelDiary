import React, { useEffect, useState, useCallback} from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import { act } from 'react-dom/test-utils';
// import CurrentLocation from './Map';

const MapContainer = (props) => {
    const { execute, pending, value, error } = useAsync(getCurrentLocation, false);
    
    const [showingInfoWindow, setShowingInfoWindow] = useState(true);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});
    const [multiLoc, setMultiLoc] = useState(false);
    const [locationSet, setLocationSet] = useState(false);
    const [currentLocation, setCurrentLocation] = useState({}); //current user location
    const [bounds, setBounds] = useState({});
    const [mapCenter, setMapCenter] = useState({});

    // execute ? setLocationSet(true)
    
    
    
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
        if (multiLoc) {
            return props.locationArray.map((store, index) => {
                // console.dir(store)
                // console.dir(index)
                return <Marker  key={index} 
                                id={index} 
                                position={store}
                                onClick={() => onMarkerClick()} 
                                name={'Current Location'} />
            })
        }else{
        return <Marker onClick={onMarkerClick} name={'Current Location'}
        />
            }
    };
    const displayInfoWindow = () => {
        if (multiLoc) {
            return props.infoWindows.map((store, index) => {
                console.dir(store)
                console.dir(index)
                console.dir(props.locationArray[index])
                return <InfoWindow  location={props.locationArray[index]} 
                                    visible={showingInfoWindow} 
                                    onClose={onClose()}
                                    name={store}
                                    key={index}>
                <div>
                    {/* <h4>{store}</h4> */}
                </div>
                </InfoWindow>
          })
        }else {
            return <InfoWindow
                        marker={activeMarker}
                        visible={showingInfoWindow}
                        onClose={onClose}
          >
          <div>
            <h4>{selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        }    
    }

    var findBounds = () => {
        var bounds = new props.google.maps.LatLngBounds();
        props.locationArray.map(loc => bounds.extend(loc))
        console.dir(bounds)
        setBounds(bounds)
    }

    const findCenter = () => {
        console.dir(props.locationArray)
        console.dir(locationSet)
        console.dir(currentLocation)
    
        if (locationSet){
            if (props.locationArray !== undefined){
                setShowingInfoWindow(true)
                if (props.locationArray instanceof Array) {
                    setMultiLoc(true)
                    findBounds()
                }
                else{
                    setMapCenter(props.locationArray)
                }
            console.log(`mapcenter ${mapCenter},${mapCenter.lat},${mapCenter.lng}`)
            console.log(`props location ${props.locationArray},${props.locationArray[0].lat},${props.locationArray[0].lng}`)
            }else{
                setMapCenter(currentLocation)
                setMultiLoc(false)
                setShowingInfoWindow(false)
            }
        }
    }
    console.log(`execute:${execute}`)
    console.log(`value:${value}`)
    console.log(`mapCenter:${mapCenter}`)
    console.dir(mapCenter)
    if ((value !== null)){
        setCurrentLocation(value)
        console.log('value')
        console.dir(value)
        if (currentLocation !== undefined)
        {
        setLocationSet(true)
        findCenter();
         }
    }
    

    const renderMap = () => {
        if (mapCenter !== undefined){
            if (multiLoc){ return (
                <Map
                    google={props.google}
                    // onClick={onMapClicked()}
                    bounds={bounds}
                    style={props.mapSize} 
                    onReady={execute}
                    visible={locationSet}
                    // initialCenter={mapCenter}
                    >
                
                    {displayMarkers()}
                    {displayInfoWindow()}

                </Map> )}else{return (
                <Map
                    google={props.google}
                    // onClick={onMapClicked()}
                    zoom={8}
                    style={props.mapSize} 
                    initialCenter={mapCenter}
                    visible={locationSet}
                    // initialCenter={{ lat: -46.174305, 
                    //                 lng: -115.154568}}
                    onReady={execute}
                    >
                
                    {displayMarkers()}
                    {displayInfoWindow()}
                </Map>)}}
    }
        
    return(
        <div>
            {renderMap()}
        </div>
    );
}

//Asynchronous function to get the current location from browser
const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var currentLocation = {}
            if (navigator && navigator.geolocation){
                navigator.geolocation.getCurrentPosition(pos => {
                    var coords = pos.coords;
                        currentLocation = {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    console.dir(currentLocation)                       
                });
            }currentLocation ?
            resolve(currentLocation) :
            reject(false);

            // console.log(`Curr location ${currentLocation},${currentLocation.lat},${currentLocation.lng}`)
            
        }, 2000);
    });
};

// Hook used to manage the asynchronous feedback
const useAsync = (asyncFunction, immediate = true) => {
const [pending, setPending] = useState(false);
const [value, setValue] = useState(null);
const [error, setError] = useState(null);

// The execute function wraps asyncFunction and
// handles setting state for pending, value, and error.
// useCallback ensures the below useEffect is not called
// on every render, but only if asyncFunction changes.
const execute = useCallback(() => {
setPending(true);
setValue(null);
setError(null);
return asyncFunction()
    .then(response => setValue(response))
    .catch(error => setError(error))
    .finally(() => setPending(false));
}, [asyncFunction]);

// Call execute if we want to fire it right away.
// Otherwise execute can be called later, such as
// in an onClick handler.
useEffect(() => {
if (immediate) {
    execute();
}
}, [execute, immediate]);

return { execute, pending, value, error };
};


export default GoogleApiWrapper({
    apiKey: 'AIzaSyAu9sMNLJ0_hfvGG23wyP-IUDDVks8eGKI'
})(MapContainer);