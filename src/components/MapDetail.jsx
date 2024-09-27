import React, { useEffect, useState } from 'react'
import { MdClose } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
// import DetailContent from './DetailContent';
import BorderContent from './BorderContent';

function MapDetail({ infoData, isClosing, setIsClosing }, e) {
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        if (infoData && infoData.length > 0) {
            const [countryInfo] = infoData;
            setSelectedCountry(countryInfo);
        }
    }, [infoData])

    // useEffect(() => {
    //     const closeOnEscape = (e) => e.key === "Escape" && onClose();
    //     window.addEventListener("keydown", closeOnEscape);
    //     return () => window.removeEventListener("keydown", closeOnEscape);
    // }, []);

    useEffect(() => {
        const closeOnEscape = (e) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", closeOnEscape)
    }, [])

    const onClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setSelectedCountry(null);
            setIsClosing(false);
        }, 300);
    };

    return (
        <>
            {selectedCountry && (
                <div className={`map-detail bg-gray-200 h-full w-1/2 absolute top-0 left-0 z-[10000] dark:bg-black p-4 max-lg:w-full ${isClosing ? 'expand' : ''} dark:text-white`}>
                    <IoExitOutline onClick={onClose} className="cursor-pointer absolute top-2.5	left-2.5 text-3xl max-lg:hidden" />
                    <MdClose onClick={onClose} className="closeIcon dark:bg-black dark:text-gray-200 hidden rounded-[50%] z-10 cursor-pointer absolute top-2.5	right-2.5 text-3xl max-lg:flex" />
                    <div className='MapDetail bg-whitesmoke'>
                        <h1 className='font-semibold text-5xl text-center pt-12 pb-16 text-red-500 max-lg:pb-6 max-lg:pt-5 max-lg:text-4xl'>{selectedCountry.name?.common}</h1>
                        <div className="country-info flex justify-around items-center gap-5 flex-row max-lg:flex-col">
                            <p className="text-base flex gap-8 items-center flex-col max-lg:flex-row ">
                                <span className='font-semibold h-full w-full'>
                                    <img className='h-40 max-lg:w-40 max-lg:h-32' src={selectedCountry.flags.png} alt={`${selectedCountry.name?.common}`} />
                                </span>
                                <span className='font-semibold w-full'>
                                    <img className='h-52 max-lg:w-40 max-lg:h-36' src={selectedCountry.coatOfArms.png} alt={`${selectedCountry.name?.common}`} />
                                </span>
                            </p>
                            <div className="countryInfoText w-[500px] border-2 px-5 py-5 mt-0 grid grid-col-1 gap-2.5 rounded-3xl border-green-700 max-lg:w-full max-lg:border-none max-lg:p-0 max-lg:grid-cols-1 max-lg:pb-5 md:grid-cols-2 max-md:mt-7 lg:grid-cols-1">
                                <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Capital: </span>{selectedCountry.capital}</p>
                                <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Population: </span>{selectedCountry.population}</p>
                                <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Area: </span>{selectedCountry.area}</p>
                                <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Name Official: </span>{selectedCountry.name?.official} </p>
                                <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Subregion: </span>{selectedCountry.subregion}</p>
                                <BorderContent />
                            </div>
                        </div>
                    </div>
                    {/* <DetailContent/> */}
                </div>
            )}
        </>
    )
}

export default MapDetail