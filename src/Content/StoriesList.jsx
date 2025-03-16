import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import SRC from "../assets/src.webp";
import handleScrollToTop from "../Theme/HandleSmoothScroll";

const StoriesList = (props) => {
  const navigate = useNavigate();

  const { eachPart, eachStory } = props;
  const language = useSelector((state) => state.language.language);
  console.log(eachPart, eachStory, "eachPart eachStory db");

  const handleSuggestionClick = (title) => {
    for (let lan in title) {
      if (title[lan] === eachPart.title[lan]) {
        title = eachPart.title[lan];
        console.log(title, "title");
        break;
      }
    }
    navigate(`/detailstory/${encodeURIComponent(title)}`); // Navigate using title
    handleScrollToTop();
  };

  return (
    <div className="my-[10px]">
      <div
        className="w-[350px] h-[400px] border-2 rounded-[20px] cursor-pointer hover:duration-700 hover:scale-[1.02]"
        onClick={() => handleSuggestionClick(eachPart?.title)}
        key={eachPart?.id}
      >
        <div className="h-full bg-slate-200 dark:bg-slate-800 p-1 rounded-[20px] flex flex-col justify-between ">
          <div>
            <img
              className="w-full h-[200px] object-cover rounded-tr-[20px] rounded-tl-[20px]"
              src={eachPart?.thumbnailImage ? eachPart?.thumbnailImage : SRC}
              alt="img"
            />
            <p className="border-l-4 border-y-0 border-r-0 mt-3 border-solid border-l-emerald-700 px-[10px] py-[3px] text-[15px] font-semibold">
              {eachPart.storyType[language]}
            </p>
            <div className="p-[10px]">
              <h2 className="text-[15px] font-bold">
                {eachPart?.title[language]}
              </h2>
              <p className="text-[14px] mt-2">{eachPart?.description[language]}</p>
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
