import React, { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { PopupContent } from './PopupContent'
import { MapContainer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapLayer from './MapLayer';
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryContent } from "../redux/slices/restCountrySlice";
import { IoExitOutline } from "react-icons/io5";
import { Link } from "react-router-dom"
import { fetchCountryDetail } from "../redux/slices/countrySlice";

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
  const [selectedCountry, setSelectedCountry] = useState(null)
  const countryData = useSelector(state => state.restCountry.infoData);
  const latitude = 51.505;
  const longitude = -0.09;


  // mapDetail
  const { infoData } = useSelector((state) => state.country);
  console.log(infoData)
  const countries = useSelector((state) => state.restCountry.infoData)
  const borderCountries = infoData?.borders
    ? infoData.borders.map(border => {
      const country = countries.find(country => country.cca3 === border);
      return country ? country.name?.common : "null";
    }).filter(Boolean)
    : [];


  //mapContent
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

    // layer.bindPopup(popupContent);
    layer.on({
      click: () => {
        setSelectedCountry(countryInfo)
        dispatch(fetchCountryDetail(countryName))
      },
    });
  };


  return (
    <div id="map-content-wrapper" className="flex h-screen">

      <div className="map-detail w-1/2 bg-gray-300 p-4">
        {/* <div className='pl-8 pt-8'>
          <Link to='/'>
            <IoExitOutline className='text-3xl cursor-pointer ' />
          </Link>
        </div> */}

        {
          selectedCountry ? (
            <div className='MapDetail h-full bg-whitesmoke'>
              <h1 className='font-semibold text-5xl text-center pt-12 pb-16 text-red-500'>{selectedCountry.name?.common}</h1>
              <div className="country-info flex justify-around items-center gap-10">
                <p className="text-base flex gap-8 flex-col">
                  <span className='font-semibold h-full w-full'>
                    <img className='h-40' src={selectedCountry.flags.png ?? '---'} alt="" />
                  </span>
                  <span className='font-semibold w-full'>
                    <img className='h-52' src={selectedCountry.coatOfArms.png ?? '---'} alt="" />
                  </span>
                </p>
                <div className="countryInfoText w-10/12 border-2 px-5 py-5 grid gap-2.5 rounded-3xl border-green-700">
                  <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Capital: </span>{selectedCountry.capital ?? '---'}</p>
                  <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Population: </span>{selectedCountry.population ?? '---'}</p>
                  <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Area: </span>{selectedCountry.area ?? '---'}</p>
                  <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Name Official: </span>{selectedCountry.name?.official ?? '---'} </p>
                  <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Subregion: </span>{selectedCountry.subregion ?? '---'}</p>
                  <p className="italic text-lg"><span className="font-semibold not-italic text-xl">Border Country: </span>
                    {borderCountries && borderCountries.length > 0
                      ? borderCountries.join(', ')
                      : 'No bordering countries'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <h1 className='font-semibold text-5xl text-center pt-12 pb-28 text-red-500'>

            </h1>
          )
        }
      </div>
      <div className="map-container">
        <MapContainer
          center={[latitude, longitude]}
          zoom={2}
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