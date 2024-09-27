// import React, { useEffect, useState } from 'react'
// import BorderContent from "./BorderContent";

// function DetailContent({ infoData }) {
//     const [selectedCountry, setSelectedCountry] = useState(null);
//     useEffect(() => {
//         if (infoData && infoData.length > 0) {
//             const [countryInfo] = infoData;
//             setSelectedCountry(countryInfo);
//         }
//     }, [infoData])

//     return (
//         <>
//             {selectedCountry && (
//                 <div className='MapDetail bg-whitesmoke'>
//                     <h1 className='font-semibold text-5xl text-center pt-12 pb-16 text-red-500 max-lg:pb-6 max-lg:pt-5 max-lg:text-4xl'>{selectedCountry.name?.common}</h1>
//                     <div className="country-info flex justify-around items-center gap-5 flex-row max-lg:flex-col">
//                         <p className="text-base flex gap-8 items-center flex-col max-lg:flex-row ">
//                             <span className='font-semibold h-full w-full'>
//                                 <img className='h-40 max-lg:w-40 max-lg:h-32' src={selectedCountry.flags.png} alt={`${selectedCountry.name?.common}`} />
//                             </span>
//                             <span className='font-semibold w-full'>
//                                 <img className='h-52 max-lg:w-40 max-lg:h-36' src={selectedCountry.coatOfArms.png} alt={`${selectedCountry.name?.common}`} />
//                             </span>
//                         </p>
//                         <div className="countryInfoText w-[500px] border-2 px-5 py-5 mt-0 grid grid-col-1 gap-2.5 rounded-3xl border-green-700 max-lg:w-full max-lg:border-none max-lg:p-0 max-lg:grid-cols-1 max-lg:pb-5 md:grid-cols-2 max-md:mt-7 lg:grid-cols-1">
//                             <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Capital: </span>{selectedCountry.capital}</p>
//                             <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Population: </span>{selectedCountry.population}</p>
//                             <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Area: </span>{selectedCountry.area}</p>
//                             <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Name Official: </span>{selectedCountry.name?.official} </p>
//                             <p className="italic text-lg"><span className='font-semibold not-italic text-xl'>Subregion: </span>{selectedCountry.subregion}</p>
//                             <BorderContent />
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }

// export default DetailContent