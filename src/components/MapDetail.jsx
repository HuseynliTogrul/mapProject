import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'
import { IoExitOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"
import { fetchCountryDetail } from '../redux/slices/countrySlice';
import { fetchCountryContent } from '../redux/slices/restCountrySlice';

const MapDetail = () => {
    const [params] = useSearchParams();
    const dispatch = useDispatch();

    const { infoData } = useSelector((state) => state.country);
    const countries = useSelector((state) => state.restCountry.infoData)

    useEffect(() => {
        dispatch(fetchCountryContent())
    }, [])

    useEffect(() => {
        const country = params.get('country');
        if (country) {
            dispatch(fetchCountryDetail(country));
        }
    }, [params, dispatch]);


    if (!infoData) return;

    const borderCountries = infoData.borders?.map(border => {
        const country = countries.find(country => country.cca3 === border);
        return country ? country.name?.common : "null";
    }).filter(Boolean);

    return (
        <div className='MapDetail bg-gray-300 h-screen'>
            <div className='pl-8 pt-8'><Link to='/'><IoExitOutline className='text-3xl cursor-pointer ' /></Link></div>
            <h1 className='font-semibold text-5xl text-center pt-12 pb-28 text-red-500'>{infoData.name?.common}</h1>
            <div className="country-info flex justify-around items-center">
                <p className="text-base flex"><span className='font-semibold'></span> <img className='w-96 h-64	' src={infoData.flags.png ?? '---'} alt="" /></p>
                <div className="countryInfoText w-2/5 border-2 px-5 py-5 flex flex-col gap-2.5 rounded-3xl border-green-700">
                    <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Capital: </span>{infoData.capital ?? '---'}</p>
                    <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Population: </span>{infoData.population ?? '---'}</p>
                    <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Area: </span>{infoData.area ?? '---'}</p>
                    <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Name Official: </span>{infoData.name?.official ?? '---'} </p>
                    <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Subregion: </span>{infoData.subregion ?? '---'}</p>
                    <p className="italic text-lg"><span className="font-semibold not-italic text-xl">Border Country: </span>
                        {borderCountries && borderCountries.length > 0
                            ? borderCountries.join(', ')
                            : 'No bordering countries'}
                    </p>

                </div>
                <p className="text-base flex"><span className='font-semibold'><img className='w-88 h-72' src={infoData.coatOfArms.png ?? '---'} alt="" /> </span> </p>
            </div>
        </div>
    );
};

export default MapDetail;