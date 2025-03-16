import React, { useEffect, useState } from "react";
import { Eng } from "../Utils/Elglish/EnglishScript";
import { TeEn } from "../Utils/TeEn";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useOutletContext } from "react-router-dom";
import { StoryShimmer } from "../components/Loading/storyShimmer";
const SearchDetailStory = () => {
  const [story, setStory] = useState(null); // Set initial state to `null`
  const { stories, filteredStories } = useOutletContext(); // ✅ db stories are available here
  const { title } = useParams();

  console.log(useParams(), "chech Detail page");
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);

  const cleanName = title.startsWith(":") ? title.slice(1) : title;
  console.log(cleanName, "cleanName");

  // useEffect(() => {
  //   if (title) {
  //     // const findStory = Eng?.stories.flatMap((each) => each.parts.card);
  //     const findStory = stories.flatMap((each) => each.parts.card);

  //     if (findStory) {
  //       const set = findStory.find((eachPart) => {
  //         if (eachPart.title["en"] === cleanName) {
  //           console.log(eachPart);
  //           return eachPart;
  //         }
  //       });
  //       console.log(findStory, "find s");
  //       setStory(set || null); // Avoid setting `undefined`
  //     }
  //   }
  // }, [title]);

  useEffect(() => {
    if (title) {
      const findStory = stories.flatMap((each) => each.parts.card);

      if (findStory) {
        const set = findStory.find((eachPart) => {
          // Priority order: en -> te -> hi
          if (eachPart.title["en"] === cleanName) {
            console.log("Found match in English:", eachPart);
            return true;
          }
          if (eachPart.title["te"] === cleanName) {
            console.log("Found match in Telugu:", eachPart);
            return true;
          }
          if (eachPart.title["hi"] === cleanName) {
            console.log("Found match in Hindi:", eachPart);
            return true;
          }
          return false;
        });

        console.log(findStory, "find story parts");
        setStory(set || null);
      }
    }
  }, [title, stories, cleanName]);

  console.log(story, "story");
  const isLoading = !story;
  return (
    <div className="px-[20px] pb-[20px]">
      {isLoading ? (
        <StoryShimmer />
      ) : story?.part ? (
        <div className="px-[120px] pb-[20px]">
          <div className="flex flex-col items-center justify-center p-[10px] w-[100%]">
            <p className="text-[20px]">{story.storyType[language]}</p>
            <h3 className="font-bold md:text-3xl text-3xl mb-[5px]">{story.title[language]}</h3>
            <img src={story.thumbnailImage} className="md:h-[750px] h-fit object-cover rounded-lg w-full" alt="thumbnail" />
            
          </div>
          {story.part.map((section) => (
            <div className="py-[10px]" key={section.id}>
              <h3 className="font-bold md:text-3xl text-3xl mb-[5px]">
                {section.heading[language]}:
              </h3>
              <p className="text-[20px] mb-[15px]">{section.quote[language]}</p>
              <div className="flex items-center justify-start">
                <img
                  className="w-full md:object-cover h-fit md:w-[500px] rounded-lg mb-[20px]"
                  src={section.image}
                  alt="image"
                />
              </div>
              <p className="text-justify text-[20px]">{section.text[language]}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-2xl py-[20px]">
          <p>Coming Soon..</p>
        </div>
      )}
    </div>
  );

  // return (
  //   <div className=" px-[20px] pb-[20px]">
  //     {story?.part ? (
  //       story.part.map((section) => (
  //         <div className="py-[10px]" key={section.id}>
  //           <h3 className="font-bold md:text-3xl text-2xl mb-[5px]">
  //             {section.heading[language]}
  //           </h3>
  //           <p className="text-lg mb-[15px]">"{section.quote[language]}"</p>
  //           <div className="flex items-center justify-start">
  //             <img
  //               className="w-full md:object-cover h-fit md:w-[500px] rounded-lg mb-[20px]"
  //               src={section.image}
  //               alt="image"
  //             />
  //           </div>
  //           <p className="text-justify">{section.text[language]}</p>
  //         </div>
  //       ))
  //     ) : (
  //       <div className="text-center text-2xl py-[20px]">
  //         <p>Coming Soon..</p>
  //       </div>
  //       // Show a fallback message
  //     )}
  //   </div>
  // );
};

export default SearchDetailStory;
