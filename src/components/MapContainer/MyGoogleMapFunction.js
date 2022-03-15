import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useLocation } from '../../containers/TravDiary/LocationContext';
import Spinner from '../Spinner/LoadingSpinner';

import styled from 'styled-components';

import AutoComplete from './Autocomplete';
import Marker from './Marker';
import isEmpty from 'lodash.isempty';

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

export default function MyGoogleMap () {

    const [mapApiLoaded, setMapApiLoaded] = useState(false);
    const [mapInstance, setMapInstance] = useState();
    const [mapApi, setMapApi] = useState();
    const [geoCoder, setGeoCoder] = useState();
    const [places, setPlaces] = useState([]);
    const [zoom, setZoom] = useState(9);
    const [address, setAddress] = useState('');
    const [draggable, setDraggable] = useState(true);
    
    const [loc, setLoc] = useLocation();
    const [center, setCenter] = useState([loc.gps.lat,loc.gps.lng]);
    const [lat, setLat] = useState(loc.gps.lat);
    const [lng, setLng] = useState(loc.gps.lng);    
    
    useEffect(() => {

        // _generateAddress();
        if(mapInstance && mapApi){
            setMapApiLoaded(true);
        }
    },[mapInstance, mapApi])


    const onMarkerInteraction = (childKey, childProps, mouse) => {
        
        setDraggable(false);
        setLat(mouse.lat);
        setLng(mouse.lng);
    }

    const onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {

         setDraggable(true);
        _generateAddress();
    }

    const _onChange = ({ center, zoom }) => {
        
        setCenter(center);
        setZoom(zoom);
    }

    const _onClick = (value) => {
        
        setLat(value.lat);
        setLng(value.lng);
    }

    const apiHasLoaded = (map, maps) => {
        
        setMapInstance(map);
        setMapApi(maps);
        _stateChange(map, maps);
        
        
        
    };
    const _stateChange = (map, maps) => {
        if (mapInstance === map ){
        setMapApiLoaded(true);
        _generateAddress();}
    }
    const addPlace = (place) => {
        
        setPlaces([place]);
        setLat(place.geometry.location.lat);
        setLng(place.geometry.location.lng);
        _generateAddress()
    };

    const _generateAddress = () => {
        // const [mapApi] = mapApi;    

        const geocoder = new mapApi.Geocoder;

        geocoder.geocode({ 'location': { lat: lat, lng: lng } }, (results, status) => {
            console.log(results);
            console.log(status);
            if (status === 'OK') {
                if (results[0]) {
                    setZoom(12);
                    setAddress(results[0].formatted_address);
                    setLoc({...loc, 
                            county: results[0].address_components[3].short_name,
                            city: results[0].address_components[2].long_name,
                            state: results[0].address_components[4].long_name,
                            country: results[0].address_components[5].long_name,
                            address: results[0].formatted_address})
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }

        });
    }


        return (
            <Wrapper>
                {/* {mapApiLoaded &&  (
                    <div>
                        <AutoComplete map={mapInstance} mapApi={mapApi} addplace={addPlace} />
                    </div>)} */}
                   
                    <GoogleMapReact
                        center={center}
                        zoom={zoom}
                        // defaultCenter={center}
                        draggable={draggable}
                        onChange={_onChange}
                        onChildMouseDown={onMarkerInteraction}
                        onChildMouseUp={onMarkerInteractionMouseUp}
                        onChildMouseMove={onMarkerInteraction}
                        onChildClick={() => console.log('child click')}
                        onClick={_onClick}
                        bootstrapURLKeys={{
                            key: process.env.REACT_APP_GOOGLEMAPS_API,
                            libraries: ['places', 'geometry'],
                        }}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
                    >

                    <Marker
                        text={address}
                        lat={lat}
                        lng={lng}
                    />


                    </GoogleMapReact>            
                

                <div className="info-wrapper">
                    <div className="map-details">Latitude: <span>{lat}</span>, Longitude: <span>{lng}</span></div>
                    <div className="map-details">Zoom: <span>{zoom}</span></div>
                    <div className="map-details">Address: <span>{address}</span></div>
                </div>

            </Wrapper>
        );
    }