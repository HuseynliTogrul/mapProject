// import React, { useState } from 'react'
// import { MdClose } from "react-icons/md";
// import { IoExitOutline } from "react-icons/io5";

// function CloseContent() {
//     const [selectedCountry, setSelectedCountry] = useState(null);

//     const onClose = () => {
//         setIsClosing(true);
//         console.log("salam")
//         setTimeout(() => {
//             setSelectedCountry(null);
//             setIsClosing(false);
//         }, 300);
//     };
//     return (
//         <div>
//             <IoExitOutline onClick={onClose} className="cursor-pointer absolute top-2.5	left-2.5 text-3xl max-lg:hidden" />
//             <MdClose onClick={onClose} className="closeIcon dark:bg-black dark:text-gray-200 hidden rounded-[50%] z-10 cursor-pointer absolute top-2.5	right-2.5 text-3xl max-lg:flex" />
//         </div>
//     )
// }

// export default CloseContent