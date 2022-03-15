// Autocomplete.js
import React, { useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  text-align:center;
`;

export default function AutoComplete(props) {

    const autoComplete = {}

    useEffect(() => { 
        
        const map = props.map
        const mapApi = props.mapApi
        const options = {
            // restrict your search to a specific type of result
            types: ['address'],
            // restrict your search to a specific country, or an array of countries
            // componentRestrictions: { country: ['gb', 'us'] },
        };

        const autoComplete = new mapApi.places.Autocomplete(props.searchInput, options);

        autoComplete.addListener('place_changed', onPlaceChanged);

        return function cleanup(){
            mapApi = props.mapApi
            mapApi.event.clearInstanceListeners(props.searchInput);
        }
    },[])

    

    function onPlaceChanged (props) {
        const map = props.map
        const addplace = props.addplace
        const place = autoComplete.getPlace();

        if (!place.geometry) return;
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        props.addplace(place);
        props.searchInput.blur();
    };

    function clearSearchBox() {
        props.searchInput.value = ''
    }

        return (
            <Wrapper>
                <input
                    className="search-input"
                    ref={(ref) => {
                        props.searchInput = ref;
                    }}
                    type="text"
                    onFocus={clearSearchBox}
                    placeholder="Enter a location"
                />
            </Wrapper>
        );
    }

