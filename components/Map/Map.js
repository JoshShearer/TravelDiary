import React, { useEffect, useState } from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';


const MapContainer = (props) => {
    // this.state = {
        // const [showingInfoWindow, setShowingInfoWindow] = useState(false);
        // const [activeMarker, setActiveMarker] = useState({});
        // const [selectedPlace, setSelectedPlace] = useState({});
        // const [multiLoc, setMultiLoc] = useState(false);
        const [locationSet, setLocationSet] = useState(false);
        const [currentLocation, setCurrentLocation] = useState({});
        // const [mapCenter, setMapCenter] = useState({});
    // };

    useEffect(() => {
        if (navigator && navigator.geolocation){
            navigator.geolocation.getCurrentPosition(pos => {
                const coords = pos.coords;
                // this.setState({
                    setCurrentLocation({
                        lat: coords.latitude,
                        lng: coords.longitude
                    })
                    setLocationSet(true)
                // });
            });
        }
        console.log(`Curr location ${currentLocation},${currentLocation.lat},${currentLocation.lng}`)
        console.log(`wrtffff ${locationSet}`)

        if(!currentLocation){
            setCurrentLocation({ lat: -36.174305, 
                                lng: -115.154568});
        }
        return function unmounting() {
            if (locationSet) {
              console.log("unmounting now");
            }
        };

    }, [currentLocation]);

    // const getCurrentLocation = () => {
    //     // if (this.props.centerAroundCurrentLocation){
    //         if (navigator && navigator.geolocation){
    //             navigator.geolocation.getCurrentPosition(pos => {
    //                 const coords = pos.coords;
    //                 // this.setState({
    //                     setCurrentLocation({
    //                         lat: coords.latitude,
    //                         lng: coords.longitude
    //                     })
    //                     setLocationSet(true)
    //                 // });
    //         });
    //     }
    //     console.log(`Curr location ${currentLocation},${currentLocation.lat},${currentLocation.lng}`)
        // checkMulti();
        // findCenter();
    // }

    // const onMarkerClick = (props, marker, e) => {
    //     // this.setState({
    //         setSelectedPlace(props);
    //         setActiveMarker(marker);
    //         setShowingInfoWindow(true);
    //     };
    // const onClose = props => {
    //     if (showingInfoWindow){
    //         // this.setState({
    //             setShowingInfoWindow(false);
    //             setActiveMarker(null);
    //         // });
    //     }
    // };
    // const displayMarker = () => {
    //     if (multiLoc) {
    //     return props.location.map((store, index) => {
    //         return <Marker key={index} id={index} position={{
    //          lat: store.lat,
    //          lng: store.lng
    //        }}
    //        onClick={onMarkerClick} name={'Current Location'} />
    //       })
    //     }else{
    //       return <Marker onClick={onMarkerClick} name={'current location'}
    //        />
    //     }
    // };
    // const displayInfoWindow = () => {
    //     if (multiLoc) {
    //         return props.infoWindows.map((store, index) => {
    //             return <InfoWindow  marker={index} 
    //                                 visible={showingInfoWindow} 
    //                                 onClose={showingInfoWindow}>
    //             <div>
    //                 <h1>{this.store}</h1>
    //             </div>
    //             </InfoWindow>
    //       })
    //     }else {
    //         return <InfoWindow
    //                     marker={activeMarker}
    //                     visible={showingInfoWindow}
    //                     onClose={onClose}
    //       >
    //       <div>
    //         <h4>{selectedPlace.name}</h4>
    //       </div>
    //     </InfoWindow>
    //     }    
    // }

    // const findCenter = () => {
    //     if (props.location !== undefined){
    //     setMapCenter((locationSet ? 
    //         (multiLoc  ? props.location.slice(-1)[0] : props.location) 
    //         : currentLocation))
    //     // console.log(`state: ${state}, ${state.lat}, ${state.lng}`)
    //     // this.setState({mapCenter:state})
    //     // return state;
    //     // const pos = {   lat:position.coords.latitude,
    //     //     lng:position.coords.longitude}
    //     console.log(`start ${mapCenter},${mapCenter.lat},${mapCenter.lng}`)
    //     console.log(`props location ${props.location},${props.location.lat},${props.location.lng}`)
    // }else{
    //     setMapCenter(currentLocation)
    // }}

    // const checkMulti = () => {
    //     if (props.location !== undefined) {
    //     // this.setState({
    //     setMultiLoc(props.location.isArray ? true : false)
    //     setShowingInfoWindow(props.location.isArray ? true : false)
    //     console.log(`infowindow: ${showingInfoWindow}`)
    //     console.log(`location info: ${props.location}`)
    //     console.log(`wtf ${props.location.length}`)
    //     }else{
    //         setMultiLoc(false)
    //         setShowingInfoWindow(false)
    //     }
    // }

    // render() {
        
        return(
            <Map
                google={props.google}
                zoom={10}
                style={props.mapSize} 
                initialCenter={currentLocation}>
            
                {/* {displayMarker()}
                {displayInfoWindow()} */}
            {/* </CurrentLocation> */}
            </Map> 
        );
    // }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyAu9sMNLJ0_hfvGG23wyP-IUDDVks8eGKI'
})(MapContainer);