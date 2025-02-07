import React, { useEffect, useState } from "react";
import { Eng } from "../Utils/Elglish/EnglishScript";
import { useParams } from "react-router-dom";

const SearchDetailStory = () => {
    const [story, setStory] = useState(null); // Set initial state to `null`
    const { title } = useParams();
    console.log(useParams(), "chech Detail page")
    const cleanName = title.startsWith(":") ? title.slice(1) : title;
 
  
    useEffect(() => {
      if (title) {
        const findStory = Eng?.stories.flatMap((each) => each.parts.card);
  
        if (findStory) {
          const set = findStory.find(
            (eachPart) => {
                if (eachPart.title=== cleanName){
                    console.log(eachPart)
                    return eachPart
                }
            }
          );
          console.log(findStory,"find s")
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
                {section.heading}
              </h3>
              <p className="text-lg mb-[15px]">"{section.quote}"</p>
              <div className="flex items-center justify-start">
                <img
                  className="w-[700px] rounded-lg mb-[20px]"
                  src={section.image}
                  alt="image"
                />
              </div>
              <p className="text-justify">{section.text}</p> 
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
  

export default SearchDetailStory