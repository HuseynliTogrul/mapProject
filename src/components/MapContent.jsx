import React, { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { PopupContent } from './PopupContent';
import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapLayer from './MapLayer';
import { fetchCountryContent } from "../redux/slices/restCountrySlice";
import { fetchCountryDetail } from "../redux/slices/countrySlice";
import SetMaxBounds from "./SetMaxBounds";
import DarkLightMode from "./DarkLightMode";
import MapDetail from "./MapDetail";
import Post from "../../services/post";
import { useDispatch, useSelector } from "react-redux";


const MapContent = () => {
  const mapRef = useRef(null);
  const [geoData, setGeoData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const countryData = useSelector((state) => state.restCountry.infoData);
  const { infoData } = useSelector((state) => state.country);
  const dispatch = useDispatch();
  const latitude = 55.505;
  const longitude = 35.09;


  useEffect(() => {
    dispatch(fetchCountryContent());
  }, [dispatch]);

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
      popupContent += `<p>Məlumat tapılmadı</p>`;
    }

    layer.on({
      click: () => {
        dispatch(fetchCountryDetail(countryName));
      },
    });
  };

  return (
    <div id="map-content-wrapper" className=" h-screen">
      <MapDetail infoData={infoData} isClosing={isClosing} setIsClosing={setIsClosing} />
      <div className={`origin-right transition-all duration-700 ${selectedCountry ? 'w-1/2 max-lg:hidden' : 'w-full relative'}`}>
        <DarkLightMode />
        <Post setGeoData={setGeoData} />
        <MapContainer
          center={[latitude, longitude]}
          zoom={5}
          ref={mapRef}
          style={{ height: "100vh", width: "100%" }}
          className="dark:brightness-[0.6] dark:invert dark:contrast-[3] dark:hue-rotate-[200deg] dark:saturate-[0.3]"
        >
          <MapLayer geoData={geoData} onEachCountry={onEachCountry} />
          <SetMaxBounds />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapContent;