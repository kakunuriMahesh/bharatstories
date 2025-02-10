import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import SRC from "../assets/src.webp";
import handleScrollToTop from "../Theme/HandleSmoothScroll";

const StoriesList = (props) => {
  const navigate = useNavigate();

  const { eachPart, eachStory } = props;
  const language = useSelector((state) => state.language.language);

  const handleSuggestionClick = (title) => {
    navigate(`/detailstory/${encodeURIComponent(title)}`); // Navigate using title
    handleScrollToTop();
  };

  return (
    <div className="my-[10px] ">
      <div
        className="w-[260px] h-[350px] border-2 rounded-[20px] cursor-pointer hover:duration-700 hover:scale-[1.02]"
        onClick={() => handleSuggestionClick(eachPart?.title["en"])}
        key={eachPart?.id}
      >
        <div className="h-[350px] bg-slate-200 dark:bg-slate-800 p-1 rounded-[20px] flex flex-col justify-between ">
          <div>
            <img
              className="w-full h-[150px] object-cover rounded-tr-[20px] rounded-tl-[20px]"
              src={eachPart?.coverImage ? eachPart?.coverImage : SRC}
              alt="img"
            />
            <p className="border-l-4 border-y-0 border-r-0 mt-3 border-solid border-l-emerald-700 px-[10px] py-[3px] text-[12px] font-semibold">
              {eachPart.storyType[language]}
            </p>
            <div className="p-[10px]">
              <h2 className="text-[15px] font-bold">
                {eachPart?.title[language]}
              </h2>
              <p className="text-[12px]">{eachPart?.description[language]}</p>
            </div>
          </div>
          <p className="px-[10px] pb-[10px]">
            <span>{eachPart?.date[language]} </span>
            {eachPart?.timeToRead[language]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoriesList;
