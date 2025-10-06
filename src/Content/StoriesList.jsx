import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import SRC from "../assets/src.webp";
import handleScrollToTop from "../Theme/HandleSmoothScroll";

const StoriesList = (props) => {
  const navigate = useNavigate();

  const { eachPart, eachStory, partNumber } = props;
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

  // Check if the part has content in the selected language
  if (!eachPart.title[language] || !eachPart.description[language] || !eachPart.storyType[language] || !eachPart.timeToRead[language]) {
    return null; // Don't render if content is missing for this language
  }

  return (
    <div className="my-[10px] flex justify-center">
      <div
        className="w-full max-w-[550px] h-auto border-2 rounded-[20px] cursor-pointer hover:duration-700 hover:scale-[1.02]"
        onClick={() => handleSuggestionClick(eachPart?.title)}
        key={eachPart?.id}
      >
        <div className="h-[100%] w-[350px] bg-slate-200 dark:bg-slate-800 rounded-[20px] flex flex-col justify-between">
          <div>
            <img
              className="w-full h-[200px] object-cover rounded-tr-[20px] rounded-tl-[20px] md:h-[250px]"
              src={eachPart?.thumbnailImage ? eachPart?.thumbnailImage : SRC}
              alt="img"
            />
            <div className="border-l-4 border-y-0 border-r-0 my-3 border-solid border-l-[#008080] dark:border-l-[#00F0FF] flex items-center h-fit justify-between font-extrabold text-[#008080] dark:text-[#00F0FF] bg-white dark:bg-[#0080807a]">
              <p className="  px-5 py-1 text-sm font-semibold">
                {eachPart.storyType[language]}
              </p>
              <p className="my-3 px-5 text-sm font-semibold">
                {eachStory} Part-{partNumber + 1}
              </p>
            </div>
            <div className="px-5">
              <h2 className="text-base font-bold md:text-lg">
                {eachPart?.title[language]}
              </h2>
              <p className="text-sm mt-2 md:text-base">
                {eachPart?.description[language]?.slice(0, 90)}...
              </p>
            </div>
          </div>
          <p className="p-5 pb-3 text-sm">
            {/* <span>{eachPart?.date[language]} </span> */}
            {eachPart?.timeToRead[language]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoriesList;
