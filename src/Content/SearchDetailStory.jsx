// COOKIES ARE WORKING

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useOutletContext, useNavigate } from "react-router-dom";
// import { StoryShimmer } from "../components/Loading/storyShimmer";
// import StoriesList from "./StoriesList";
// import handleScrollToTop from "../Theme/HandleSmoothScroll";
// import Cookies from "js-cookie";

// const SearchDetailStory = () => {
//   const [story, setStory] = useState(null);
//   const [currentStoryParts, setCurrentStoryParts] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [nextStoryTitle, setNextStoryTitle] = useState("");
//   const { stories, filteredStories } = useOutletContext();
//   const { title } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const language = useSelector((state) => state.language.language);

//   const cleanName = title.startsWith(":") ? title.slice(1) : title;

//   useEffect(() => {
//     if (title && stories.length > 0) {
//       const currentStory = stories.find((story) =>
//         story.parts.card.some((part) =>
//           [part.title["en"], part.title["te"], part.title["hi"]].includes(cleanName)
//         )
//       );

//       if (currentStory) {
//         setCurrentStoryParts(currentStory.parts.card);
//         const currentPart = currentStory.parts.card.find((part) =>
//           [part.title["en"], part.title["te"], part.title["hi"]].includes(cleanName)
//         );
//         setStory(currentPart || null);

//         // Store in cookies
//         const recentlyRead = Cookies.get("recentlyRead")
//           ? JSON.parse(Cookies.get("recentlyRead"))
//           : [];
//         const newEntry = {
//           title: currentPart.title[language],
//           timestamp: new Date().toISOString(),
//         };
//         const updatedRead = [
//           newEntry,
//           ...recentlyRead.filter((item) => item.title !== newEntry.title), // Remove duplicates
//         ].slice(0, 5); // Limit to 5 recent stories
//         Cookies.set("recentlyRead", JSON.stringify(updatedRead), { expires: 7 }); // Expires in 7 days
//       }
//     }
//   }, [title, stories, cleanName, language]);

//   const getCurrentIndex = () => {
//     return currentStoryParts.findIndex((part) =>
//       [part.title["en"], part.title["te"], part.title["hi"]].includes(cleanName)
//     );
//   };

//   const handleNext = () => {
//     const currentIndex = getCurrentIndex();
//     if (currentIndex < currentStoryParts.length - 1) {
//       const nextPart = currentStoryParts[currentIndex + 1];
//       navigate(`/detailstory/${nextPart.title[language]}`);
//       handleScrollToTop();
//     } else {
//       const currentStoryIndex = stories.findIndex((s) =>
//         s.parts.card.some((p) => p.title[language] === cleanName)
//       );
//       if (currentStoryIndex < stories.length - 1) {
//         const nextStory = stories[currentStoryIndex + 1];
//         setNextStoryTitle(nextStory.parts.card[0].title[language]);
//         setShowPopup(true);
//       }
//     }
//   };

//   const handlePrevious = () => {
//     const currentIndex = getCurrentIndex();
//     if (currentIndex > 0) {
//       const prevPart = currentStoryParts[currentIndex - 1];
//       navigate(`/detailstory/${prevPart.title[language]}`);
//       handleScrollToTop();
//     }
//   };

//   const handlePopupConfirm = () => {
//     setShowPopup(false);
//     navigate(`/detailstory/${nextStoryTitle}`);
//     handleScrollToTop();
//   };

//   const currentStoryIndex = stories.findIndex((s) =>
//     s.parts.card.some((p) => p.title[language] === cleanName)
//   );
//   const nextStory = currentStoryIndex < stories.length - 1 ? stories[currentStoryIndex + 1] : null;

//   const isLoading = !story || currentStoryParts.length === 0;

//   return (
//     <div className="px-[20px] pb-[20px] relative">
//       {isLoading ? (
//         <StoryShimmer />
//       ) : story?.part ? (
//         <div className="px-[120px] pb-[20px]">
//           <div className="flex flex-col items-center justify-center p-[10px] w-[100%]">
//             <p className="text-[20px]">{story.storyType[language]}</p>
//             <h3 className="font-bold md:text-3xl text-3xl mb-[5px]">
//               {story.title[language]}
//             </h3>
//             <img
//               src={story.thumbnailImage}
//               className="md:h-[750px] h-fit object-cover rounded-lg w-full"
//               alt="thumbnail"
//             />
//           </div>
//           {story.part.map((section) => (
//             <div className="py-[10px]" key={section.id}>
//               <h3 className="font-bold md:text-3xl text-3xl mb-[5px]">
//                 {section.heading[language]}:
//               </h3>
//               <p className="text-[20px] mb-[15px]">{section.quote[language]}</p>
//               <div className="flex items-center justify-start">
//                 <img
//                   className="w-full md:object-cover h-fit md:w-[500px] rounded-lg mb-[20px]"
//                   src={section.image}
//                   alt="image"
//                 />
//               </div>
//               <p className="text-justify text-[20px]">{section.text[language]}</p>
//             </div>
//           ))}
//           <div className="flex justify-between mt-6">
//             <button
//               onClick={handlePrevious}
//               disabled={getCurrentIndex() === 0}
//               className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-400"
//             >
//               Previous
//             </button>
//             <button
//               onClick={handleNext}
//               className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800"
//             >
//               Next
//             </button>
//           </div>
//           {nextStory && (
//             <div className="mt-6">
//               <h2 className="text-2xl font-bold mb-4">Next Story: {nextStory.name[language]}</h2>
//               <div className="flex gap-4 overflow-x-auto">
//                 {nextStory.parts.card.map((eachPart) => (
//                   <StoriesList
//                     key={eachPart.id}
//                     eachPart={eachPart}
//                     eachStory={nextStory.name[language]}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="text-center text-2xl py-[20px]">
//           <p>Coming Soon..</p>
//         </div>
//       )}

//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <p className="text-lg mb-4 text-black">
//               You've reached the end of this story! Would you like to start the next story: <strong>{nextStoryTitle}</strong>?
//             </p>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowPopup(false)}
//                 className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
//               >
//                 No
//               </button>
//               <button
//                 onClick={handlePopupConfirm}
//                 className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800"
//               >
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchDetailStory;

// FIXME: next and previous working fine with popUp but cookies are not added

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { StoryShimmer } from "../components/Loading/storyShimmer";
import handleScrollToTop from "../Theme/HandleSmoothScroll";

const SearchDetailStory = () => {
  const [story, setStory] = useState(null);
  const [currentStoryParts, setCurrentStoryParts] = useState([]); // Parts of the current story
  const [showPopup, setShowPopup] = useState(false); // For next story popup
  const [nextStoryTitle, setNextStoryTitle] = useState(""); // Next story suggestion
  const { stories, filteredStories } = useOutletContext();
  const { title } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);

  const cleanName = title.startsWith(":") ? title.slice(1) : title;

  // Fetch and set the current story and its parts
  useEffect(() => {
    if (title && stories.length > 0) {
      // Find the current story
      const currentStory = stories.find((story) =>
        story.parts.card.some((part) =>
          [part.title["en"], part.title["te"], part.title["hi"]].includes(
            cleanName
          )
        )
      );

      if (currentStory) {
        setCurrentStoryParts(currentStory.parts.card); // Set only the parts of the current story
        const currentPart = currentStory.parts.card.find((part) =>
          [part.title["en"], part.title["te"], part.title["hi"]].includes(
            cleanName
          )
        );
        setStory(currentPart || null);
      }
    }
  }, [title, stories, cleanName]);

  // Helper function to find the current index within the current story's parts
  const getCurrentIndex = () => {
    return currentStoryParts.findIndex((part) =>
      [part.title["en"], part.title["te"], part.title["hi"]].includes(cleanName)
    );
  };

  // Handle Next Button
  const handleNext = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex < currentStoryParts.length - 1) {
      // Move to the next part within the same story
      const nextPart = currentStoryParts[currentIndex + 1];
      navigate(`/detailstory/${nextPart.title[language]}`);
      handleScrollToTop();
    } else {
      // If last part of the current story, suggest the next story
      const currentStoryIndex = stories.findIndex((s) =>
        s.parts.card.some((p) => p.title[language] === cleanName)
      );
      console.log();
      if (currentStoryIndex < stories.length - 1) {
        const nextStory = stories[currentStoryIndex + 1];
        setNextStoryTitle(nextStory.parts.card[0].title[language]); // First part of next story
        setShowPopup(true);
      }
    }
  };

  // Handle Previous Button
  const handlePrevious = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex > 0) {
      const prevPart = currentStoryParts[currentIndex - 1];
      navigate(`/detailstory/${prevPart.title[language]}`);
      handleScrollToTop();
    }
  };

  // Handle Popup Confirmation
  const handlePopupConfirm = () => {
    setShowPopup(false);
    navigate(`/detailstory/${nextStoryTitle}`);
    handleScrollToTop();
  };

  const isLoading = !story || currentStoryParts.length === 0;

  return (
    <div className="px-[20px] pb-[20px] relative">
      {isLoading ? (
        <StoryShimmer />
      ) : story?.part ? (
        <div className="md:px-[50px] pb-[20px]">
          <div className="flex flex-col items-center justify-center p-[10px] w-[100%]">
            <p className="md:text-[20px] text-[18px]">
              {story.storyType[language]}
            </p>
            <h3 className="font-bold md:text-3xl text-xl mb-[5px]">
              {story.title[language]}
            </h3>
            <img
              src={story.thumbnailImage}
              className="md:h-[450px] h-fit object-cover rounded-lg w-full"
              alt="thumbnail"
            />
          </div>
          {/* {story.part.map((section) => (
            <div className="py-[10px]" key={section.id}>
              <h3 className="font-bold md:text-xl text-lg mb-[5px]">
                {section.heading[language]}:
              </h3>
              <p className="md:text-[15px] mb-[15px]">{section.quote[language]}</p>
              <div className="flex items-center justify-start">
                <img
                  className="w-full md:object-cover h-fit md:w-[500px] rounded-lg mb-[20px]"
                  src={section.image}
                  alt="image"
                />
              </div>
              <p className="text-justify md:text-[15px]">{section.text[language]}</p>
            </div>
          ))} */}
          {story.part.map((section, index) => (
            <div
              className={`py-[10px] flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-6`}
              key={section.id}
            >
              {/* Image Section */}
              <div className="md:w-1/2 w-full">
                <img
                  className="w-full h-auto md:object-cover rounded-lg"
                  src={section.image}
                  alt="image"
                />
              </div>

              {/* Content Section */}
              <div className="md:w-1/2 w-full">
                <h3 className="font-bold md:text-xl text-lg mb-[5px]">
                  {section.heading[language]}:
                </h3>
                <p className="md:text-[15px] mb-[15px]">
                  {section.quote[language]}
                </p>
                <p className="text-justify md:text-[15px]">
                  {section.text[language]}
                </p>
              </div>
            </div>
          ))}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevious}
              disabled={getCurrentIndex() === 0}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg disabled:opacity-50 hover:bg-gray-400"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-2xl py-[20px]">
          <p>Coming Soon..</p>
        </div>
      )}

      {/* Popup for Next Story */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg mb-4 text-black">
              You've reached the end of this story! Would you like to start the
              next story: <strong>{nextStoryTitle}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={handlePopupConfirm}
                className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDetailStory;

// FIXME: next and previous buttons working but popup not working

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useOutletContext, useNavigate } from "react-router-dom";
// import { StoryShimmer } from "../components/Loading/storyShimmer";

// const SearchDetailStory = () => {
//   const [story, setStory] = useState(null);
//   const [allParts, setAllParts] = useState([]); // To store all parts for navigation
//   const [showPopup, setShowPopup] = useState(false); // For next story popup
//   const [nextStoryTitle, setNextStoryTitle] = useState(""); // Next story suggestion
//   const { stories, filteredStories } = useOutletContext();
//   const { title } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const language = useSelector((state) => state.language.language);

//   const cleanName = title.startsWith(":") ? title.slice(1) : title;

//   // Fetch and set the current story and all parts
//   useEffect(() => {
//     if (title && stories.length > 0) {
//       const findStoryParts = stories.flatMap((each) => each.parts.card);
//       setAllParts(findStoryParts); // Store all parts for navigation

//       const currentStory = findStoryParts.find((eachPart) => {
//         return (
//           eachPart.title["en"] === cleanName ||
//           eachPart.title["te"] === cleanName ||
//           eachPart.title["hi"] === cleanName
//         );
//       });

//       setStory(currentStory || null);
//     }
//   }, [title, stories, cleanName]);

//   // Helper function to find the current index
//   const getCurrentIndex = () => {
//     return allParts.findIndex((part) =>
//       [part.title["en"], part.title["te"], part.title["hi"]].includes(cleanName)
//     );
//   };

//   // Handle Next Button
//   const handleNext = () => {
//     const currentIndex = getCurrentIndex();
//     if (currentIndex < allParts.length - 1) {
//       const nextPart = allParts[currentIndex + 1];
//       console.log(nextPart, "nextPart");
//       navigate(`/detailstory/${nextPart.title[language]}`); // Navigate to next part using English title (or adjust as needed)
//     } else {
//       // If last part, suggest the next story
//       const currentStoryIndex = stories.findIndex((s) =>
//         s.parts.card.some((p) => p.title[language] === cleanName)
//       );
//       if (currentStoryIndex < stories.length - 1) {
//         const nextStory = stories[currentStoryIndex + 1];
//         setNextStoryTitle(nextStory.parts.card[0].title[language]); // First part of next story
//         setShowPopup(true);
//       }
//     }
//   };

//   // Handle Previous Button
//   const handlePrevious = () => {
//     const currentIndex = getCurrentIndex();
//     if (currentIndex > 0) {
//       const prevPart = allParts[currentIndex - 1];
//       navigate(`/detailstory/${prevPart.title[language]}`);
//     }
//   };

//   // Handle Popup Confirmation
//   const handlePopupConfirm = () => {
//     setShowPopup(false);
//     navigate(`/detailstory/${nextStoryTitle}`);
//   };

//   const isLoading = !story || allParts.length === 0;

//   return (
//     <div className="px-[20px] pb-[20px] relative">
//       {isLoading ? (
//         <StoryShimmer />
//       ) : story?.part ? (
//         <div className="px-[120px] pb-[20px]">
//           <div className="flex flex-col items-center justify-center p-[10px] w-[100%]">
//             <p className="text-[20px]">{story.storyType[language]}</p>
//             <h3 className="font-bold md:text-3xl text-3xl mb-[5px]">
//               {story.title[language]}
//             </h3>
//             <img
//               src={story.thumbnailImage}
//               className="md:h-[750px] h-fit object-cover rounded-lg w-full"
//               alt="thumbnail"
//             />
//           </div>
//           {story.part.map((section) => (
//             <div className="py-[10px]" key={section.id}>
//               <h3 className="font-bold md:text-3xl text-3xl mb-[5px]">
//                 {section.heading[language]}:
//               </h3>
//               <p className="text-[20px] mb-[15px]">{section.quote[language]}</p>
//               <div className="flex items-center justify-start">
//                 <img
//                   className="w-full md:object-cover h-fit md:w-[500px] rounded-lg mb-[20px]"
//                   src={section.image}
//                   alt="image"
//                 />
//               </div>
//               <p className="text-justify text-[20px]">{section.text[language]}</p>
//             </div>
//           ))}
//           {/* Navigation Buttons */}
//           <div className="flex justify-between mt-6">
//             <button
//               onClick={handlePrevious}
//               disabled={getCurrentIndex() === 0}
//               className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-400"
//             >
//               Previous
//             </button>
//             <button
//               onClick={handleNext}
//               className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="text-center text-2xl py-[20px]">
//           <p>Coming Soon..</p>
//         </div>
//       )}

//       {/* Popup for Next Story */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <p className="text-lg mb-4">
//               You've reached the end! Would you like to start the next story: <strong>{nextStoryTitle}</strong>?
//             </p>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowPopup(false)}
//                 className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
//               >
//                 No
//               </button>
//               <button
//                 onClick={handlePopupConfirm}
//                 className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800"
//               >
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchDetailStory;

// FIXME: next and previous buttons

// import React, { useEffect, useState } from "react";
// import { Eng } from "../Utils/Elglish/EnglishScript";
// import { TeEn } from "../Utils/TeEn";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useOutletContext } from "react-router-dom";
// import { StoryShimmer } from "../components/Loading/storyShimmer";

// const SearchDetailStory = () => {
//   const [story, setStory] = useState(null); // Set initial state to `null`
//   const { stories, filteredStories } = useOutletContext(); // ✅ db stories are available here
//   const { title } = useParams();

//   console.log(useParams(), "chech Detail page");
//   const dispatch = useDispatch();
//   const language = useSelector((state) => state.language.language);

//   const cleanName = title.startsWith(":") ? title.slice(1) : title;
//   console.log(cleanName, "cleanName");

//   // useEffect(() => {
//   //   if (title) {
//   //     // const findStory = Eng?.stories.flatMap((each) => each.parts.card);
//   //     const findStory = stories.flatMap((each) => each.parts.card);

//   //     if (findStory) {
//   //       const set = findStory.find((eachPart) => {
//   //         if (eachPart.title["en"] === cleanName) {
//   //           console.log(eachPart);
//   //           return eachPart;
//   //         }
//   //       });
//   //       console.log(findStory, "find s");
//   //       setStory(set || null); // Avoid setting `undefined`
//   //     }
//   //   }
//   // }, [title]);

//   useEffect(() => {
//     if (title) {
//       const findStory = stories.flatMap((each) => each.parts.card);

//       if (findStory) {
//         const set = findStory.find((eachPart) => {
//           // Priority order: en -> te -> hi
//           if (eachPart.title["en"] === cleanName) {
//             console.log("Found match in English:", eachPart);
//             return true;
//           }
//           if (eachPart.title["te"] === cleanName) {
//             console.log("Found match in Telugu:", eachPart);
//             return true;
//           }
//           if (eachPart.title["hi"] === cleanName) {
//             console.log("Found match in Hindi:", eachPart);
//             return true;
//           }
//           return false;
//         });

//         console.log(findStory, "find story parts");
//         setStory(set || null);
//       }
//     }
//   }, [title, stories, cleanName]);

//   console.log(story, "story");
//   const isLoading = !story;
//   return (
//     <div className="px-[20px] pb-[20px]">
//       {isLoading ? (
//         <StoryShimmer />
//       ) : story?.part ? (
//         <div className="px-[120px] pb-[20px]">
//           <div className="flex flex-col items-center justify-center p-[10px] w-[100%]">
//             <p className="text-[20px]">{story.storyType[language]}</p>
//             <h3 className="font-bold md:text-3xl text-3xl mb-[5px]">{story.title[language]}</h3>
//             <img src={story.thumbnailImage} className="md:h-[750px] h-fit object-cover rounded-lg w-full" alt="thumbnail" />

//           </div>
//           {story.part.map((section) => (
//             <div className="py-[10px]" key={section.id}>
//               <h3 className="font-bold md:text-3xl text-3xl mb-[5px]">
//                 {section.heading[language]}:
//               </h3>
//               <p className="text-[20px] mb-[15px]">{section.quote[language]}</p>
//               <div className="flex items-center justify-start">
//                 <img
//                   className="w-full md:object-cover h-fit md:w-[500px] rounded-lg mb-[20px]"
//                   src={section.image}
//                   alt="image"
//                 />
//               </div>
//               <p className="text-justify text-[20px]">{section.text[language]}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-2xl py-[20px]">
//           <p>Coming Soon..</p>
//         </div>
//       )}
//     </div>
//   );

// };

// export default SearchDetailStory;

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
