import React from 'react';
import MyGoogleMap from '../components/MapContainer/MyGoogleMap';
import { useLocation } from '../containers/TravDiary/LocationContext';
import styled from 'styled-components';


const Wrapper = styled.main`
  width: 100%;
  height: 100%;

  .main-wrapper {
    height: 85vh;
    margin: 5px 5px;
    filter: drop-shadow(-1px 5px 3px #ccc);
    border-width: 3px;
    ${'' /* border-style: solid;
    border-color: #ff8040;
    border-radius: 5px; */}
  }
  .info-wrapper {
    margin-top: 15px;
  }
  .map-details {
    text-align: center;
    font-size: 1.2em;
  }
  .map-details span {
    font-weight: bold;
  }
  .search-input {
    font-size: 1.2em;
    width: 80%;
  }
`;


export default function Home () {

        const [, updateLocation] = useLocation();
                

        return (
            
            <Wrapper>
                <div className="main-wrapper">
                    <MyGoogleMap locationUpdate={updateLocation}/>
                </div>
            </Wrapper>            
        );
    }


