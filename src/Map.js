import React, { useState, useEffect } from "react";
import "./Map.css";
import { MapContainer as LeafletMap, TileLayer, Marker, useMap } from "react-leaflet";
import { showDataOnMap } from "./util";
import styled, { css } from 'styled-components';

function MyUpdateLeaflet({ countries, casesType, center, zoom }) {   
  const map = useMap();  
  map.setView(center, zoom);  
  return null;
}

function Map({ countries, casesType, center, zoom }) {  
  const [displayMode, setDisplayMode] = useState(false);

  useEffect(() => {
    const dm = localStorage.getItem("displaymode");
    const dmBool = (dm == "false") != Boolean(dm);
    setDisplayMode(dmBool);
  }, []);

  const MapDiv = styled.div`
    background-color: #fff;
    color: black;

    ${displayMode &&
    css`
      background-color: #333;
      padding: 0.4rem;
      border-radius: 10px;
      color: white;
    `}
  `;

  return (
    <MapDiv className="map">
      <LeafletMap center={center} zoom={zoom} style={{borderRadius: "5px"}}>
        <MyUpdateLeaflet 
          countries={countries} 
          casesType={casesType}  
          center={center} zoom={zoom}           
        >
          {/* { showDataOnMap(countries, casesType) } */}
        </MyUpdateLeaflet>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreet</a>'
        />
        { showDataOnMap(countries, casesType) }        
      </LeafletMap>
    </MapDiv>
  );
}

export default Map;
