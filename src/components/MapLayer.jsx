import React from "react";
import { TileLayer, GeoJSON } from "react-leaflet";

const MapLayer = ({ geoData, onEachCountry }) => {
    return (
        <>
            <TileLayer
                minZoom='2'
                attribution='&copy; <a href="https://leafletjs.com/examples/accessibility/example.html">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geoData && <GeoJSON data={geoData} onEachFeature={onEachCountry} />}
        </>
    )
}

export default MapLayer;