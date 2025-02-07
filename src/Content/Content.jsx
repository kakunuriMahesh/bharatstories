import React, { useEffect, useState, useRef } from "react";
import { Home, Info, Phone, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Eng } from "../Utils/Elglish/EnglishScript"; // get the content based on the local storage value "Eng" || "Tel"
import { Tel } from "../Utils/Elglish/EnglishScript";
import StoriesList from "./StoriesList";
// import useDarkMode from "../Theme/useDarkMode";

const Content = () => {
  console.log(Eng, "English");
  const [localization, setLocalization] = useState("Eng");
  // const [isDark, setIsDark] = useDarkMode();
  console.log(localization);
  const navigate = useNavigate();

  const handleViewAll = (storyName) => {
    console.log(storyName, ":viewAll");
    navigate(`/viewstory/:${storyName}`);
  };

  return (
    <div>
      {/* <nav className="sticky top-0 flex items-center md:justify-between p-6 bg-slate-400 shadow-lg h-[100px]">
        <h1 className="hidden md:flex font-bold text-[18px] md:text-[30px]">
          Bharat Stories
        </h1>
        <ul className="hidden md:flex md:gap-6 md:text-2xl">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <div className="md:hidden flex w-full items-center relative">
          <input
            placeholder="Bharat Stories"
            className="text-center px-[60px] w-[100%] h-[60px] rounded-[30px]"
          />
          <div className="block md:hidden absolute left-[12px]">
            <div
              ref={iconRef}
              className="w-[40px] h-[40px] p-1 border-2 shadow-2xl bg-white rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300"
              onClick={handleIconClick}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              {sections[activeIndex].icon}
            </div>

            {dropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white shadow-md rounded-lg p-2 flex flex-col gap-2">
                {sections.map(
                  (section, index) =>
                    index !== activeIndex && (
                      <div
                        key={section.name}
                        className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded cursor-pointer"
                        onClick={() => handleSelectIcon(index)}
                      >
                        {section.icon}
                      </div>
                    )
                )}
              </div>
            )}
          </div>
          <div className="absolute right-[12px]">
            <Search />
          </div>
        </div>
      </nav> */}

      <div className="mt-[10px]  px-[20px] pb-[20px]">
        <div className="bg-slate-600 w-[60px] text-center border rounded-md text-white px-[5px] py-[3px] cursor-pointer">
          {localization === "Eng" ? (
            <h1
              onClick={() => {
                setLocalization(Tel);
                // localStorage.setItem("localization", "Telugu");
              }}
            >
              {Eng.language}
            </h1>
          ) : (
            <h1
              onClick={() => {
                setLocalization("Eng");
                // localStorage.setItem("localization", "English");
              }}
            >
              Tel
            </h1>
          )}
        </div>
        {/* <button
          onClick={() => setIsDark(!isDark)}
          className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark text-white"
        >
          {isDark ? "Light Mode" : "Dark Mode"}
        </button> */}
        {Eng?.stories.map((eachStory) => (
          <div key={eachStory?.id}>
            <div className="flex justify-between">
              <h2 className="text-[20px] font-bold">{eachStory?.name}</h2>
              <button
                onClick={() => handleViewAll(eachStory?.name)}
                className="underline cursor-pointer"
              >
                View All
              </button>
            </div>
            <div className="mt-[20px] overflow-x-scroll flex gap-2 scrollbar-hide">
              {eachStory?.parts?.card.map((eachPart) => (
                <StoriesList
                  key={eachPart.id}
                  eachPart={eachPart}
                  eachStory={eachStory.name}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
