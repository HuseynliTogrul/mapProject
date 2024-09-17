export const PopupContent = ({ countryName, countryInfo }) => (
    <div className="PopupContent">
        <h1 className='font-semibold text-4xl'>{countryName}</h1>
        <p className="text-base"><span className='font-semibold'>Capital:</span> {countryInfo.capital ?? '---'}</p>
        <p className="text-base flex"><span className='font-semibold'>Flag:</span> <img className="w-8" src={countryInfo.flags.png} /></p>
        <p className="text-base flex"><span className='font-semibold'>Coat of Arms:</span> <img className="w-8" src={countryInfo.coatOfArms.png ?? '---'} /></p>
        <a
            href={`/map-detail?country=${countryName}`}
            className="bg-green-700 !text-white  p-10 px-3.5 py-2.5 rounded w-full block text-center my-0 mx-auto">
            More
        </a>
    </div>
)