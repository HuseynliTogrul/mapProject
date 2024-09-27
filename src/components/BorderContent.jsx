import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const BorderContent = () => {

    const { infoData } = useSelector((state) => state.country);
    const countries = useSelector((state) => state.restCountry.infoData);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [countryWithBorder] = infoData?.filter(data => data.hasOwnProperty('borders')) ?? []

    const borderCountries = countryWithBorder
        ? countryWithBorder.borders.map(border => {
            const country = countries.find(country => country.cca3 === border);
            return country ? { flag: country.flags.png, name: country.name.common } : null;
        }).filter(Boolean)
        : [];

    useEffect(() => {
        if (infoData?.length) {
            const [countryInfo] = infoData
            setSelectedCountry(countryInfo);
        }
    }, [infoData])

    return (
        <>
            {selectedCountry && (
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
            )}
        </>
    )
}

export default BorderContent