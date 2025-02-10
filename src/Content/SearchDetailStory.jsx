import React, { useEffect, useState } from "react";
import { Eng } from "../Utils/Elglish/EnglishScript";
import { TeEn } from "../Utils/TeEn";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SearchDetailStory = () => {
  const [story, setStory] = useState(null); // Set initial state to `null`
  const { title } = useParams();
  console.log(useParams(), "chech Detail page");
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);

  const cleanName = title.startsWith(":") ? title.slice(1) : title;

  useEffect(() => {
    if (title) {
      // const findStory = Eng?.stories.flatMap((each) => each.parts.card);
      const findStory = TeEn?.stories.flatMap((each) => each.parts.card);

      if (findStory) {
        const set = findStory.find((eachPart) => {
          if (eachPart.title["en"] === cleanName) {
            console.log(eachPart);
            return eachPart;
          }
        });
        console.log(findStory, "find s");
        setStory(set || null); // Avoid setting `undefined`
      }
    }
  }, [title]);

  console.log(story);

  return (
    <div className=" px-[20px] pb-[20px]">
      {story?.part ? (
        story.part.map((section) => (
          <div className="py-[10px]" key={section.id}>
            <h3 className="font-bold md:text-3xl text-2xl mb-[5px]">
              {section.heading[language]}
            </h3>
            <p className="text-lg mb-[15px]">"{section.quote[language]}"</p>
            <div className="flex items-center justify-start">
              <img
                className="w-full md:object-cover h-fit md:w-[500px] rounded-lg mb-[20px]"
                src={section.image}
                alt="image"
              />
            </div>
            <p className="text-justify">{section.text[language]}</p>
          </div>
        ))
      ) : (
        <div className="text-center text-2xl py-[20px]">
          <p>Coming Soon..</p>
        </div>
        // Show a fallback message
      )}
    </div>
  );
};

export default SearchDetailStory;
