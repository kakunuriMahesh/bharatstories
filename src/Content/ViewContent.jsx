import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { Eng } from "../Utils/Elglish/EnglishScript";
import { TeEn } from "../Utils/TeEn"; 
import StoriesList from "./StoriesList";

const ViewContent = () => {
  const [story, setStory] = useState(null); // Set initial state to `null`
  const { name } = useParams();
  const language = useSelector((state) => state.language.language);
  const cleanName = name.startsWith(":") ? name.slice(1) : name;
  console.log(cleanName, "cleanName");
  //   const cleanId = id.startsWith(":") ? id.slice(1) : id;

  useEffect(() => {
    if (name) {
      // const findStory = Eng?.stories.find((story) => story?.name === cleanName);
      const findStory = TeEn?.stories.find(
        (story) => story?.name["en"] === cleanName
      );
      console.log(findStory, "findStory");

      setStory(findStory);
    }
  }, [name]);

  console.log(story);
  console.log("Iam ready to view content:", name);
  return story ? (
    <div>
      <div
        className="relative lg:h-[55vh] md:h-[50vh] h-[35vh] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${story.storyCoverImage})` }}
      >
        <div className="relative bg-black opacity-[0.4] h-full w-full"></div>
        <div className="absolute left-4 bottom-3 text-white">
          <h1 className=" text-white opacity-[0.9] font-extrabold text-[30px] md:text-[50px]">
            {story.name[language]}
          </h1>
          <p>{story.parts.card.length} Parts</p>

          <p className="text-[10px] font-semibold">ENG / TEL</p>
        </div>
      </div>
      {/* <img className="md:h-[55vh] w-full" src={story.storyCoverImage} alt="" /> */}
      <div className=" px-[20px] pb-[20px] font-sans">
        <div className="mt-[20px] overflow-x-scroll flex gap-2 scrollbar-hide ">
          {story.parts.card.map((eachPart, index) => (
            <StoriesList
              key={eachPart.id}
              eachPart={eachPart}
              eachStory={story.name}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <p>loading...</p>
  );
};

export default ViewContent;
