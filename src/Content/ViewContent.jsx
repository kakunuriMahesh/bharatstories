import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Eng } from "../Utils/Elglish/EnglishScript";

const ViewContent = () => {
  const [story, setStory] = useState(null); // Set initial state to `null`
  const { name } = useParams();
  const cleanName = name.startsWith(":") ? name.slice(1) : name;
  //   const cleanId = id.startsWith(":") ? id.slice(1) : id;

  useEffect(() => {
    if (name) {
      const findStory = Eng?.stories.find((story) => story?.name === cleanName);

      //   if (findStory) {
      //     const set = findStory?.parts?.story.find(
      //       (eachPart) => eachPart?.id === cleanId
      //     );
      //     setStory(set || null); // Avoid setting `undefined`
      //   }
      setStory(findStory);
    }
  }, [name]);

  console.log(story);
  console.log("Iam ready to view content:", name);
  return story ? (
    <div>
      <img src={story.storyCoverImage} alt="" />
    </div>
  ) : (
    <p>loading...</p>
  );
};

export default ViewContent;
