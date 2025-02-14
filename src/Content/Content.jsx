import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Home, Info, Phone, Search } from "lucide-react";
import { Eng, Tel } from "../Utils/Elglish/EnglishScript"; // English content
import { TeEn } from "../Utils/TeEn";
import StoriesList from "./StoriesList";
import HomeBanner from "./HomeBanner";

const Content = () => {
  const [searchTerm, setSearchTerm] = useState("");
  

  const language = useSelector((state) => state.language.language);
  const navigate = useNavigate();

  // ✅ Get the correct content based on selected language
  console.log(TeEn, "contentData", language);

  const handleViewAll = (storyName) => {
    navigate(`/viewstory/${storyName}`); // ✅ Removed extra ':'
  };

  //////////////////////////////////////////

  // 👇 Search Functionality
  // const [activeIndex, setActiveIndex] = useState(0);
  // const [suggestions, setSuggestions] = useState([]);
  // const locationPath = location.pathname;
  // const iconRef = useRef(null);
  // const menuState = useSelector((state) => state.language.menuState);
  // const allTitles = Eng.stories.flatMap((each) => each.parts.card);
  // let startY = useRef(null);
  // const sections = [
  //   { name: "Home", icon: <Home size={32} />, path: "/home" },
  //   { name: "About", icon: <Info size={32} />, path: "/about" },
  //   { name: "Contact", icon: <Phone size={32} />, path: "/contact" },
  // ];
  // const handleSearchChange = (e) => {
  //   const term = e.target.value;
  //   setSearchTerm(term);

  //   if (term.trim() === "") {
  //     setSuggestions([]);
  //     return;
  //   }

  //   // Filter suggestions based on title
  //   const filteredTitles = allTitles.filter((card) =>
  //     card.title.toLowerCase().includes(term.toLowerCase())
  //   );

  //   setSuggestions(filteredTitles);
  // };
  // const handleSearchSubmit = (e) => {
  //   if (e.key === "Enter") {
  //     const matchedTitle = allTitles.find(
  //       (card) => card.title.toLowerCase() === searchTerm.toLowerCase()
  //     );

  //     if (matchedTitle) {
  //       navigate(`/search/${encodeURIComponent(matchedTitle.title)}`);
  //     } else {
  //       console.log(matchedTitle, "check notfound");
  //       navigate(`/not-found/${searchTerm}`);
  //     }
  //     setSearchTerm("");
  //     setSuggestions([]);
  //   }
  // };
  // const handleSuggestionClick = (title) => {
  //   navigate(`/search/${encodeURIComponent(title)}`); // Navigate using title
  //   setSearchTerm("");
  //   setSuggestions([]);
  // };
  // 👆 Search Functionality


  return (
    <div className="mt-[10px] px-[20px] pb-[20px]">
      {/* Mobile */}
      {/* <div className="md:hidden flex w-full items-center relative">
        <input
          placeholder="Bharat Stories"
          className="text-left dark:text-text-dark text-text-light bg-text-dark dark:bg-text-light px-[60px] w-[100%] h-[60px] rounded-[30px]"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleSearchSubmit}
        />

        <div className="absolute right-[12px] dark:text-text-dark text-text-light">
          <Search />
        </div>
        {suggestions.length > 0 && (
          <ul className="absolute top-12 left-0 w-full bg-white text-black shadow-md rounded-lg">
            {suggestions.map((item, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(item.title)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div> */}
      {/* ✅ Dynamic Stories Based on Language */}
      <HomeBanner/>
      {TeEn?.stories.map((eachStory) => (
        <div key={eachStory?.id}>
          <div className="flex justify-between mt-[10px]">
            <h2 className="text-[20px] font-bold">
              {eachStory?.name[language]}
            </h2>
            <button
              onClick={() => handleViewAll(eachStory?.name["en"])}
              className="underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="mt-[10px] overflow-x-scroll flex gap-2 scrollbar-hide">
            {eachStory?.parts?.card.map((eachPart) => (
              <StoriesList 
                key={eachPart.id}
                eachPart={eachPart}
                eachStory={eachStory.name[language]}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Content;
