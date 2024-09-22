import React from "react";
import { TileLayer, GeoJSON } from "react-leaflet";

const MapLayer = ({ geoData, onEachCountry }) => {

    const geoJSONStyle = {
        color: "transparent",
        weight: 1,
        fillOpacity: 0.7
    };

    return (
        <>
            <TileLayer
                minZoom='2'
                attribution='&copy; <a href="https://leafletjs.com/examples/accessibility/example.html">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geoData && <GeoJSON data={geoData} style={geoJSONStyle} onEachFeature={onEachCountry} />}
        </>
    );
}

export default MapLayer;
