import React from "react";
import { useNavigate } from "react-router";
import SRC from "../assets/src.webp";

const StoriesList = (props) => {
  const navigate = useNavigate();

  // console.log(props);
  const { eachPart, eachStory } = props;
  // console.log(eachPart, eachStory);

  const handleDetailStory = (eachStory, id) => {
    console.log(eachStory, id);
    // detailStory.map((eachSection,index)=>)
    navigate(`/detailstory/:${eachStory}/:${id}`);
    console.log(`/detailstory/:${eachStory}/:${id}`, "detailStory");
  };

  const handleSuggestionClick = (title) => {
    navigate(`/detailstory/${encodeURIComponent(title)}`); // Navigate using title
    
  };

  return (
    <div className="my-[20px] ">
      <div
        className="w-[260px] h-[380px] border-2 rounded-[20px] cursor-pointer hover:duration-700 hover:scale-105"
        onClick={() => handleSuggestionClick(eachPart?.title)}
        key={eachPart?.id}
      >
        <div className="h-[300px] flex flex-col justify-between">
          <div>
            <img
              className="w-full h-[150px] object-cover rounded-tr-[20px] rounded-tl-[20px]"
              src={eachPart?.coverImage ? eachPart?.coverImage : SRC}
              alt="img"
            />
            <div className="p-[10px]">
              <h2 className="text-[15px] font-bold">{eachPart?.title}</h2>
              <p className="text-[12px]">{eachPart?.description}</p>
            </div>
          </div>
          <p className="px-[10px] pb-[10px]">
            <span>{eachPart?.date} </span>
            {eachPart?.timeToRead}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoriesList;
