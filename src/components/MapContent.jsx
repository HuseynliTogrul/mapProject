import React, { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { PopupContent } from './PopupContent';
import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapLayer from './MapLayer';
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryContent } from "../redux/slices/restCountrySlice";
import { fetchCountryDetail } from "../redux/slices/countrySlice";
import SetMaxBounds from "./SetMaxBounds";


const MapContent = () => {
  const mapRef = useRef(null);
  const [geoData, setGeoData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const countryData = useSelector(state => state.restCountry.infoData);
  const latitude = 55.505;
  const longitude = 35.09;


  // mapDetail
  const { infoData } = useSelector((state) => state.country);
  const countries = useSelector((state) => state.restCountry.infoData);

  // borderCountries
  const [countryWithBorder] = infoData?.filter(data => data.hasOwnProperty('borders')) ?? []
  const borderCountries = countryWithBorder
    ? countryWithBorder.borders.map(border => {
      const country = countries.find(country => country.cca3 === border);
      return country ? { flag: country.flags.png, name: country.name.common } : null;
    }).filter(Boolean)
    : [];


  // mapContent
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
      .then((response) => response.json())
      .then((data) => setGeoData(data));
  }, []);

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
        setSelectedCountry(countryInfo);
      },
    });
  };

  return (
    <div id="map-content-wrapper" className="flex h-screen">
      {selectedCountry && (
        <div className="map-detail w-1/2 bg-#e6e6e6 p-4">
          <div className='MapDetail h-full bg-whitesmoke'>
            <h1 className='font-semibold text-5xl text-center pt-12 pb-16 text-red-500'>{selectedCountry.name?.common}</h1>
            <div className="country-info flex justify-around items-center gap-10">
              <p className="text-base flex gap-8 flex-col">
                <span className='font-semibold h-full w-full'>
                  <img className='h-40' src={selectedCountry.flags.png} alt={`${selectedCountry.name?.common}`} />
                </span>
                <span className='font-semibold w-full'>
                  <img className='h-52' src={selectedCountry.coatOfArms.png} alt={`${selectedCountry.name?.common}`} />
                </span>
              </p>
              <div className="countryInfoText w-10/12 border-2 px-5 py-5 grid gap-2.5 rounded-3xl border-green-700">
                <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Capital: </span>{selectedCountry.capital ?? '---'}</p>
                <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Population: </span>{selectedCountry.population ?? '---'}</p>
                <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Area: </span>{selectedCountry.area ?? '---'}</p>
                <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Name Official: </span>{selectedCountry.name?.official ?? '---'} </p>
                <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Subregion: </span>{selectedCountry.subregion ?? '---'}</p>
                <div className="italic text-lg"><span className="font-semibold not-italic text-xl">Border Country: </span>
                  <div className="borderFlags flex flex-wrap gap-2 mt-2.5">
                    {borderCountries.length > 0
                      ? borderCountries.map((country, index) => (
                        <div key={index} className="flex w-max items-center gap-3 cursor-pointer relative group">
                          <img className="h-8 w-12" src={country.flag} alt="Border country flag" />
                          <span className="absolute bottom-full left-0 mb-2 hidden group-hover:block px-3 py-2 rounded-lg text-white bg-black">
                            {country.name}
                          </span>
                        </div>
                      ))
                      : 'No bordering countries'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={`${selectedCountry ? 'w-1/2' : 'w-full'}`}>
        <MapContainer
          center={[latitude, longitude]}
          zoom={5}
          ref={mapRef}
          style={{ height: "100vh", width: "100%" }}
        >
          <MapLayer geoData={geoData} onEachCountry={onEachCountry} />
          <SetMaxBounds />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapContent;
