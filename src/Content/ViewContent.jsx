import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { TeEn } from "../Utils/TeEn";
import StoriesList from "./StoriesList";
import ProfileStoriesList from "./ProfileStoriesList";

const ViewContent = () => {
  const [story, setStory] = useState(null); // Set initial state to `null`
  const { stories, filteredStories } = useOutletContext(); // ✅ Use `useOutletContext` to get stories
  const [targettedStories, setTargettedStories] = useState([]);
  const targettedAgeGroup = useSelector((state) => state.profile.selected);
  let getSelectedAge = localStorage.getItem("selectedProfile");
  getSelectedAge = JSON.parse(getSelectedAge) || {};

  // 🔎 Filter stories based on selected age group
  useEffect(() => {
    let filtered = [];
    if (getSelectedAge.id === 'kids') {
      filtered = stories.filter((s) => s.kids?.card?.length > 0);
      console.log("Kids stories:", filtered);
    } else if (getSelectedAge.id === 'toddler') {
      filtered = stories.filter((s) => s.toddler?.card?.length > 0);
      console.log("Toddler stories:", filtered);
    } else if (getSelectedAge.id === 'child') {
      filtered = stories.filter((s) => s.child?.card?.length > 0);
      console.log("Child stories:", filtered);
    } else if (getSelectedAge.id === 'teen') {
      filtered = stories.filter((s) => s.teen?.card?.length > 0);
      console.log("Teen stories:", filtered);
    } else if (getSelectedAge.id === 'adult') {
      filtered = stories;
      console.log("Adult stories:", filtered);
    }
    setTargettedStories(filtered);
  }, [targettedAgeGroup, stories]);

  const { name } = useParams();
  const language = useSelector((state) => state.language.language);
  const cleanName = name?.startsWith(":") ? name.slice(1) : name;

  // 🎯 Find story from filtered targettedStories with age group validation
  useEffect(() => {
    if (cleanName && targettedStories.length > 0) {
      const findStory = targettedStories.find((story) => {
        // Check if the story name matches
        const nameMatches = story?.name[language] === cleanName;
        if (!nameMatches) return false;

        // Validate that the story has content for the selected age group
        if (getSelectedAge.id === 'kids') {
          return story.kids?.card?.length > 0;
        } else if (getSelectedAge.id === 'toddler') {
          return story.toddler?.card?.length > 0;
        } else if (getSelectedAge.id === 'child') {
          return story.child?.card?.length > 0;
        } else if (getSelectedAge.id === 'teen') {
          return story.teen?.card?.length > 0;
        } else if (getSelectedAge.id === 'adult') {
          return story.parts?.card?.length > 0;
        }
        return false;
      });

      console.log("Found story for name:", cleanName, "in age group:", getSelectedAge.id, findStory);
      setStory(findStory || null);
    } else {
      console.log("No story found for name:", cleanName, "in age group:", getSelectedAge.id);
      setStory(null);
    }
  }, [cleanName, targettedStories, language, getSelectedAge.id]);

  // Helper function to get cards based on age group
  const getCardsForAgeGroup = (story, ageGroupId) => {
    switch (ageGroupId) {
      case 'kids':
        return story.kids?.card || [];
      case 'toddler':
        return story.toddler?.card || [];
      case 'child':
        return story.child?.card || [];
      case 'teen':
        return story.teen?.card || [];
      case 'adult':
        return story.parts?.card || [];
      default:
        return [];
    }
  };

  console.log("Current story:", story);
  console.log("Selected age group:", getSelectedAge.id);
  console.log("Targetted stories:", targettedStories);

  if (!story) {
    return (
      <div className="text-center text-2xl py-[20px]">
        <p>No story found for "{cleanName || 'unknown'}" in {getSelectedAge.id || 'unknown'} age group.</p>
      </div>
    );
  }

  const cards = getCardsForAgeGroup(story, getSelectedAge.id);

  return (
    <div>
      <div
        className="relative lg:h-[55vh] md:h-[50vh] h-[35vh] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${story.storyCoverImage})` }}
      >
        <div className="relative bg-black opacity-[0.4] h-full w-full"></div>
        <div className="absolute left-4 bottom-3 text-white">
          <h1 className="text-white opacity-[0.9] font-extrabold text-[30px] md:text-[50px]">
            {story.name[language]}
          </h1>
          <p>
            {(() => {
              // Filter cards that have content in the selected language
              const filteredCards = cards.filter(
                (eachPart) =>
                  eachPart.title?.[language] &&
                  eachPart.description?.[language] &&
                  eachPart.storyType?.[language] &&
                  eachPart.timeToRead?.[language]
              );
              console.log(`Filtered cards for ${getSelectedAge.id} in language ${language}:`, filteredCards);
              return filteredCards.length;
            })()}{" "}
            Parts
          </p>
          <p className="text-[10px] font-semibold">ENG / TEL / HIN</p>
        </div>
      </div>
      <div className="px-[20px] pb-[20px] font-sans flex items-center justify-center flex-col">
        <div className="mt-[20px] w-[90vw] flex flex-wrap gap-[10px]">
          {(() => {
            // Filter cards that have content in the selected language
            const filteredCards = cards.filter(
              (eachPart) =>
                eachPart.title?.[language] &&
                eachPart.description?.[language] &&
                eachPart.storyType?.[language] &&
                eachPart.timeToRead?.[language]
            );

            console.log(`Rendering filtered cards for ${getSelectedAge.id}:`, filteredCards);

            if (filteredCards.length === 0) {
              return (
                <p>No content available in selected language for {getSelectedAge.id} age group (using {getSelectedAge.id}.card).</p>
              );
            }

            return filteredCards.map((eachPart, index) => {
              // Use ProfileStoriesList for younger ages (kids, toddler, child?), StoriesList for others
              const isYoungerAge = ['kids', 'toddler', 'child'].includes(getSelectedAge.id);
              if (isYoungerAge) {
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
  );
};

export default ViewContent;

