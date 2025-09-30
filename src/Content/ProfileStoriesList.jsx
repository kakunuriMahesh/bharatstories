import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const ProfileStoriesList = (props) => {
  const navigate = useNavigate();
  const { eachPart, eachStory, partNumber } = props;
  const language = useSelector((state) => state.language.language);
  
  // Get current profile to determine navigation route
  let getSelectedAge = localStorage.getItem("selectedProfile");
  getSelectedAge = JSON.parse(getSelectedAge) || {};
  
  console.log(eachPart, eachStory, "eachPart eachStory profile");

  const handleCardClick = (title) => {
    // Navigate to StoryDetail.jsx based on profile type
    if (getSelectedAge.id === 'kids') {
      navigate(`/kids/${encodeURIComponent(title)}`);
    } else if (getSelectedAge.id === 'toddler') {
      navigate(`/toddler/${encodeURIComponent(title)}`);
    }
  };

  // Check if the part has content in the selected language
  if (!eachPart.title[language] || !eachPart.description[language] || !eachPart.storyType[language] || !eachPart.timeToRead[language]) {
    return null; // Don't render if content is missing for this language
  }

  return (
    <div className="my-[10px] flex justify-center">
      <div
        className="w-full max-w-[350px] h-auto border-2 rounded-[20px] cursor-pointer hover:duration-700 hover:scale-[1.02]"
        onClick={() => handleCardClick(eachPart.title[language] || eachPart.title.en)}
        key={eachPart?.id}
      >
        <div className="h-full bg-slate-200 dark:bg-slate-800 rounded-[20px] flex flex-col justify-between">
          <div>
            <img
              className="w-full h-[200px] object-cover rounded-tr-[20px] rounded-tl-[20px] md:h-[250px]"
              src={eachPart?.thumbnailImage || "/placeholder.jpg"}
              alt="img"
            />
            <div className="border-l-4 border-y-0 border-r-0 my-3 border-solid border-l-[#008080] dark:border-l-[#00F0FF] flex items-center h-fit justify-between font-extrabold text-[#008080] dark:text-[#00F0FF] bg-white dark:bg-[#0080807a]">
              <p className="px-5 py-1 text-sm font-semibold">
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
              <p className="text-sm mt-2 md:text-base text-gray-700 dark:text-gray-300">
                {eachPart?.description[language]?.slice(0, 90)}...
              </p>
            </div>
          </div>
          <p className="p-5 pb-3 text-sm text-gray-600 dark:text-gray-400">
            {eachPart?.timeToRead[language]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileStoriesList;
