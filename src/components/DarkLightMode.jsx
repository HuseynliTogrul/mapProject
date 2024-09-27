import React, { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";

const DarkLightMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = (shouldBeDark) => {
    setIsDarkMode(shouldBeDark);
  };

  return (
    <div className="absolute top-4 right-4 flex gap-2 z-[1000]">
      <div
        className={`sunMode bg-white rounded-[50%] w-12 h-12 flex justify-center items-center border border-[#8587ff] shadow-[rgba(50,50,93,0.25)_0px_50px_100px_-20px,rgba(0,0,0,0.3)_0px_30px_60px_-30px,rgba(10,37,64,0.35)_0px_-2px_6px_0px_inset]
          ${!isDarkMode ? "hidden" : ""}`}
        onClick={() => toggleDarkMode(false)}
      >
        <IoSunnyOutline className="sun text-3xl cursor-pointer text-black" />
      </div>
      <div
        className={`darkMode bg-white rounded-[50%] w-12 h-12 flex justify-center items-center border border-[#8587ff] shadow-[rgba(50,50,93,0.25)_0px_50px_100px_-20px,rgba(0,0,0,0.3)_0px_30px_60px_-30px,rgba(10,37,64,0.35)_0px_-2px_6px_0px_inset]
          ${isDarkMode ? "hidden" : ""}`}
        onClick={() => toggleDarkMode(true)}
      >
        <MdOutlineDarkMode className="dark text-3xl cursor-pointer text-black" />
      </div>
    </div>
  );
};

export default DarkLightMode;