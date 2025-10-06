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
  const selectedProfile = useSelector((state) => state.profile.selected);
  let getSelectedAge = localStorage.getItem("selectedProfile");
  getSelectedAge = JSON.parse(getSelectedAge) || {};
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

  // Resolve the correct cards array based on selected profile
  const getCardsForStory = (story) => {
    const profileId = getSelectedAge?.id;
    if (profileId === "child" && story?.child?.card) return story.child.card;
    if (profileId === "teen" && story?.teen?.card) return story.teen.card;
    // default to adult content
    return story?.parts?.card || [];
  };

  // Check if a card has required fields in the selected language
  const isCardValidInLanguage = (card) =>
    card?.title?.[language] &&
    card?.description?.[language] &&
    card?.storyType?.[language] &&
    card?.timeToRead?.[language];

  return (
    // <div className="mt-[10px] px-[20px] pb-[20px] flex justify-center flex-col items-center">
    //   <HomeBanner />
    //   {/* All Stories (respect selected profile: child/teen/adult) */}
    //   {stories
    //     .filter((eachStory) => {
    //       if (!eachStory.languages.includes(language)) return false;
    //       const cards = getCardsForStory(eachStory);
    //       return cards.some(isCardValidInLanguage);
    //     })
    //     .map((eachStory) => {
    //       const cards = getCardsForStory(eachStory);
    //       const visibleCards = cards.filter(isCardValidInLanguage);
    //       return (
    //         <div key={eachStory?.id} className="px-[20px]">
    //           <div className="flex justify-between mt-[10px]">
    //             <h2 className="text-[20px] font-bold">{eachStory?.name[language]}</h2>
    //             <button
    //               onClick={() => handleViewAll(eachStory?.name["en"])}
    //               className="underline cursor-pointer"
    //             >
    //               {visibleCards.length > 3 ? "View All" : ""}
    //             </button>
    //           </div>
    //           <div className="mt-[10px] w-[80vw] gap-[10px] flex overflow-x-scroll scrollbar-hide">
    //             {visibleCards.map((eachPart, index) => (
    //               <StoriesList
    //                 key={eachPart.id}
    //                 partNumber={index}
    //                 eachPart={eachPart}
    //                 eachStory={eachStory.name[language]}
    //               />
    //             ))}
    //           </div>
    //         </div>
    //       );
    //     })}
    // </div>
    <div className="mt-[10px] px-[20px] pb-[20px] flex justify-center flex-col items-center">
  <HomeBanner />
  {/* Filter stories by selected language */}
  {stories.some((story) => {
    if (!story.languages.includes(language)) return false;
    const cards = getCardsForStory(story);
    return cards.some(isCardValidInLanguage);
  }) ? (
    stories
      .filter((eachStory) => {
        if (!eachStory.languages.includes(language)) return false;
        const cards = getCardsForStory(eachStory);
        return cards.some(isCardValidInLanguage);
      })
      .map((eachStory) => {
        const cards = getCardsForStory(eachStory);
        const visibleCards = cards.filter(isCardValidInLanguage);
        return (
          <div key={eachStory?.id} className="px-[20px]">
            <div className="flex justify-between mt-[10px]">
              <h2 className="text-[20px] font-bold">
                {eachStory?.name[language]}
              </h2>
              <button
                onClick={() => handleViewAll(eachStory?.name["en"])}
                className="underline cursor-pointer"
              >
                {visibleCards.length > 3 ? "View All" : ""}
              </button>
            </div>
            <div className="mt-[10px] w-[80vw] gap-[10px] flex overflow-x-scroll scrollbar-hide">
              {visibleCards.map((eachPart, index) => (
                <StoriesList
                  key={eachPart.id}
                  partNumber={index}
                  eachPart={eachPart}
                  eachStory={eachStory.name[language]}
                />
              ))}
            </div>
          </div>
        );
      })
  ) : (
    <p className="mt-[20px] text-gray-500 text-center">
      No stories available in the selected language.
    </p>
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
