import React, { useEffect, useState } from "react";
import { Eng } from "../Utils/Elglish/EnglishScript";
import { useParams } from "react-router-dom";

const DetailStory = () => {
  const [story, setStory] = useState(null); // Set initial state to `null`
  const { name, id } = useParams();
  const cleanName = name.startsWith(":") ? name.slice(1) : name;
  const cleanId = id.startsWith(":") ? id.slice(1) : id;

  useEffect(() => {
    if (name && id) {
      const findStory = Eng?.stories.find((story) => story?.name === cleanName);

      if (findStory) {
        const set = findStory?.parts?.story.find(
          (eachPart) => eachPart?.id === cleanId
        );
        setStory(set || null); // Avoid setting `undefined`
      }
    }
  }, [name, id]);

  console.log(story);

  return (
    <div>
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
                alt="sectionimg"
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

export default DetailStory;
