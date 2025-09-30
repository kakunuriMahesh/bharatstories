import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
// import { Eng } from "../Utils/Elglish/EnglishScript";
import { TeEn } from "../Utils/TeEn";
import StoriesList from "./StoriesList";
import ProfileStoriesList from "./ProfileStoriesList";

const ViewContent = () => {
  const [story, setStory] = useState(null); // Set initial state to `null`
  const { stories, filteredStories } = useOutletContext(); // ✅ Use `useOutletContext` to get stories
  const [targettedStories, setTargettedStories] = useState(stories);
  const targettedAgeGroup = useSelector((state) => state.profile.selected);
  let getSelectedAge = localStorage.getItem("selectedProfile");
  getSelectedAge = JSON.parse(getSelectedAge) || {};
  useEffect(() => {
    if (getSelectedAge.id === 'kids') {
      // console.log("Kids stories:", stories.filter((s) => s.kids?.card?.length > 0));
      setTargettedStories(stories.filter((s) => s.kids?.card?.length > 0));
    } else if (getSelectedAge.id === 'toddler') {
      // console.log("Toddler stories:", stories.filter((s) => s.toddler?.card?.length > 0));
      setTargettedStories(stories.filter((s) => s.toddler?.card?.length > 0));
    } else if (getSelectedAge.id === 'adult') {
      // console.log("Adult stories:", stories);
      setTargettedStories(stories);
    }
  }, [targettedAgeGroup]);

  console.log(useOutletContext, "storiesSearch");
  const { name } = useParams();
  const language = useSelector((state) => state.language.language);
  const cleanName = name.startsWith(":") ? name.slice(1) : name;
  console.log(cleanName, "cleanName");
  //   const cleanId = id.startsWith(":") ? id.slice(1) : id;

  useEffect(() => {
    if (name) {
      // const findStory = Eng?.stories.find((story) => story?.name === cleanName);

      const findStory = targettedStories.find(
        (story) => story?.name["en"] === cleanName
      );
      console.log(findStory, "findStory");

      setStory(findStory);
    }
  }, [name, targettedAgeGroup]);

  console.log(story, 'check story in view content');
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
          <p>
            {
              (() => {
                const cards = getSelectedAge.id === 'kids' || getSelectedAge.id === 'toddler' 
                  ? story[getSelectedAge.id]?.card || []
                  : story.parts?.card || [];
                
                return cards.filter(
                  (eachPart) =>
                    eachPart.title?.[language] &&
                    eachPart.description?.[language] &&
                    eachPart.storyType?.[language] &&
                    eachPart.timeToRead?.[language]
                ).length;
              })()
            }{" "}
            Parts
          </p>

          <p className="text-[10px] font-semibold">ENG / TEL / HIN</p>
        </div>
      </div>
      {/* <img className="md:h-[55vh] w-full" src={story.storyCoverImage} alt="" /> */}
      <div className=" px-[20px] pb-[20px] font-sans flex items-center justify-center flex-col">
        <div className="mt-[20px] w-[90vw] flex flex-wrap gap-[10px]">
          {(() => {
            // Get the correct card collection based on profile type
            const cards = getSelectedAge.id === 'kids' || getSelectedAge.id === 'toddler' 
              ? story[getSelectedAge.id]?.card || []
              : story.parts?.card || [];
            
            // Filter cards that have content in the selected language
            const filteredCards = cards.filter(
              (eachPart) =>
                eachPart.title?.[language] &&
                eachPart.description?.[language] &&
                eachPart.storyType?.[language] &&
                eachPart.timeToRead?.[language]
            );
            
            // If no cards have content in selected language, show message
            if (filteredCards.length === 0) {
              return <p>No content available in selected language</p>;
            }
            
            // Render the filtered cards
            return filteredCards.map((eachPart, index) => {
              // Use different components based on profile type
              if (getSelectedAge.id === 'kids' || getSelectedAge.id === 'toddler') {
                return (
                  <ProfileStoriesList
                    key={eachPart.id}
                    partNumber={index}
                    eachPart={eachPart}
                    eachStory={eachPart.name}
                  />
                );
              } else {
                return (
                  <StoriesList
                    key={eachPart.id}
                    partNumber={index}
                    eachPart={eachPart}
                    eachStory={eachPart.name}
                  />
                );
              }
            });
          })()}
        </div>
      </div>
    </div>
  ) : (
    <p>loading...</p>
  );
};

export default ViewContent;
