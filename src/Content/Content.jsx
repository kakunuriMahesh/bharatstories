import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Home, Info, Phone, Search } from "lucide-react";
import { Eng, Tel } from "../Utils/Elglish/EnglishScript"; // English content
import { TeEn } from "../Utils/TeEn";
import StoriesList from "./StoriesList";
import HomeBanner from "./HomeBanner";

const Content = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { stories, filteredStories } = useOutletContext();
  console.log(stories, "stories");
  console.log(filteredStories, "filteredStories");

  const language = useSelector((state) => state.language.language);

  const navigate = useNavigate();

  // ✅ Get the correct content based on selected language
  console.log(TeEn, "contentData", language);

  const handleViewAll = (storyName) => {
    navigate(`/viewstory/${storyName}`); // ✅ Removed extra ':'
  };

  return (
    <div className="mt-[10px] px-[20px] pb-[20px] flex justify-center flex-col items-center">
      <HomeBanner />
        {stories.map((eachStory) => (
          <div key={eachStory?.id} className="px-[20px]">
            <div className="flex justify-between mt-[10px]">
              <h2 className="text-[20px] font-bold">
                {eachStory?.name[language]}
              </h2>
              <button
                onClick={() => handleViewAll(eachStory?.name["en"])}
                className="underline cursor-pointer"
              >
                {eachStory.parts.card.length > 3 ? "View All" : ""}
              </button>
            </div>

            <div className="mt-[10px] w-[80vw] gap-[10px] flex overflow-x-scroll scrollbar-hide">
              {eachStory?.parts?.card.map((eachPart, index) => (
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
