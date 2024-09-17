import React, { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { PopupContent } from './PopupContent'
import { MapContainer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapLayer from './MapLayer';
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryContent } from "../redux/slices/restCountrySlice";

function SetMaxBounds() {
  const map = useMap()

  useEffect(() => {
    const southWest = L.latLng(-85, -180);
    const northEast = L.latLng(85, 180);
    const bounds = L.latLngBounds(southWest, northEast);

    map.setMaxBounds(bounds);

    map.on('drag', function () {
      map.panInsideBounds(bounds, { animate: false });
    });

    return () => {
      map.off('drag');
    };
  }, [map]);

  return null
}

const MapContent = () => {
  const mapRef = useRef(null);
  const [geoData, setGeoData] = useState(null);
  const countryData = useSelector(state => state.restCountry.infoData);
  const latitude = 51.505;
  const longitude = -0.09;

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
      .then((response) => response.json())
      .then((data) => setGeoData(data));
  }, []);

  useEffect(() => {
    dispatch(fetchCountryContent());
  }, [dispatch])

  const getCountryInfo = (countryName) => {
    return countryData?.find(
      (country) => country.name.common.toLowerCase() === countryName.toLowerCase() || country.name.official.toLowerCase() === countryName.toLowerCase()
    );
  };

  const onEachCountry = (country, layer) => {
    const countryName = country.properties.name;
    const countryInfo = getCountryInfo(countryName);

    let popupContent = `<h1 class="font-semibold text-xl">${countryName}</h1>`;

    if (countryInfo) {
      popupContent = renderToString(<PopupContent countryName={countryName} countryInfo={countryInfo} />);
    } else {
      popupContent += `<p>Məlumat tapilmadi</p>`;
    }

    layer.bindPopup(popupContent);
    layer.on({
      click: () => {
        layer.bindPopup();
      },
    });
  };


  return (
    <div id="map">
      <MapContainer
        center={[latitude, longitude]}
        zoom={2}
        ref={mapRef}
        style={{ height: "100vh", width: "100vw" }}
      >
        <MapLayer geoData={geoData} onEachCountry={onEachCountry} />
        <SetMaxBounds />
      </MapContainer>
    </div>
  );
};


export default MapContent;