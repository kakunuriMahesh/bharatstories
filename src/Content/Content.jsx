import React, { useState, useEffect } from "react"; // Added useEffect
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Home, Info, Phone, Search } from "lucide-react";
import StoriesList from "./StoriesList";
import HomeBanner from "./HomeBanner";
import Cookies from "js-cookie";

const Content = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentlyRead, setRecentlyRead] = useState([]);
  const { stories, filteredStories } = useOutletContext();
  const language = useSelector((state) => state.language.language);
  const navigate = useNavigate();

  // Load recently read stories from cookies
  useEffect(() => {
    const readStories = Cookies.get("recentlyRead")
      ? JSON.parse(Cookies.get("recentlyRead"))
      : [];
    setRecentlyRead(readStories);
  }, []);

  const handleViewAll = (storyName) => {
    navigate(`/viewstory/${storyName}`);
  };

  return (
    <div className="mt-[10px] px-[20px] pb-[20px] flex justify-center flex-col items-center">
      <HomeBanner />

      {/* Recently Read Stories */}
      {/* {recentlyRead.length > 0 && (
        <div className="px-[20px] w-full">
          <h2 className="text-[20px] font-bold mt-[20px]">Recently Read Stories</h2>
          <div className="mt-[10px] w-[80vw] gap-[10px] flex overflow-x-scroll scrollbar-hide">
            {recentlyRead.map((readStory) => {
              const story = stories.flatMap((s) => s.parts.card).find(
                (part) => part.title[language] === readStory.title
              );
              return story ? (
                <StoriesList
                  key={story.id}
                  eachPart={story}
                  eachStory={stories.find((s) => s.parts.card.includes(story)).name[language]}
                />
              ) : null;
            })}
          </div>
        </div>
      )} */}

      {/* All Stories */}
      {stories.map(
        (eachStory) =>
          eachStory.languages.includes(language) && (
            <div key={eachStory?.id} className="px-[20px]">
              <div className="flex justify-between mt-[10px]">
                <h2 className="text-[20px] font-bold">
                  {eachStory.parts.card.length !== 0 ? eachStory?.name[language] : ""}
                </h2>
                <button
                  onClick={() => handleViewAll(eachStory?.name["en"])}
                  className="underline cursor-pointer"
                >
                  {eachStory.parts.card.filter((eachPart) => 
                    eachPart.title[language] && 
                    eachPart.description[language] && 
                    eachPart.storyType[language] && 
                    eachPart.timeToRead[language]
                  ).length > 3 ? "View All" : ""}
                </button>
              </div>
              <div className="mt-[10px] w-[80vw] gap-[10px] flex overflow-x-scroll scrollbar-hide">
                {eachStory?.parts?.card
                  .filter((eachPart) => 
                    eachPart.title[language] && 
                    eachPart.description[language] && 
                    eachPart.storyType[language] && 
                    eachPart.timeToRead[language]
                  )
                  .map((eachPart, index) => (
                    <StoriesList
                      key={eachPart.id}
                      partNumber = {index}
                      eachPart={eachPart}
                      eachStory={eachStory.name[language]}
                    />
                  ))}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Content;

// FIXME: hadleing cookies to store recently readed stories
// import React, { useState, useRef } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate, useOutletContext } from "react-router-dom";
// import { Home, Info, Phone, Search } from "lucide-react";
// import { Eng, Tel } from "../Utils/Elglish/EnglishScript"; // English content
// import { TeEn } from "../Utils/TeEn";
// import StoriesList from "./StoriesList";
// import HomeBanner from "./HomeBanner";

// const Content = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const { stories, filteredStories } = useOutletContext();
//   console.log(stories, "stories");
//   console.log(filteredStories, "filteredStories");

//   const language = useSelector((state) => state.language.language);

//   const navigate = useNavigate();

//   // ✅ Get the correct content based on selected language
//   console.log(TeEn, "contentData", language);

//   const handleViewAll = (storyName) => {
//     navigate(`/viewstory/${storyName}`); // ✅ Removed extra ':'
//   };

//   return (
//     <div className="mt-[10px] px-[20px] pb-[20px] flex justify-center flex-col items-center">
//       <HomeBanner />
//       {stories.map(
//         (eachStory) =>
//           eachStory.languages.includes(language) && (
//             <div key={eachStory?.id} className="px-[20px]">
//               <div className="flex justify-between mt-[10px]">
//                 <h2 className="text-[20px] font-bold">
//                   {eachStory.parts.card.length != 0
//                     ? eachStory?.name[language]
//                     : ""}
//                 </h2>
//                 <button
//                   onClick={() => handleViewAll(eachStory?.name["en"])}
//                   className="underline cursor-pointer"
//                 >
//                   {eachStory.parts.card.length > 3 ? "View All" : ""}
//                 </button>
//               </div>

//               <div className="mt-[10px] w-[80vw] gap-[10px] flex overflow-x-scroll scrollbar-hide">
//                 {eachStory?.parts?.card.map((eachPart, index) => (
//                   <StoriesList
//                     key={eachPart.id}
//                     eachPart={eachPart}
//                     eachStory={eachStory.name[language]}
//                   />
//                 ))}
//               </div>
//             </div>
//           )
//       )}
//     </div>
//   );
// };

// export default Content;
