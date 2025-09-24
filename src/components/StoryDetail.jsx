// import React from "react";
// import { useParams, useOutletContext } from "react-router-dom";
// import { useSelector } from "react-redux";

// const StoryDetail = () => {
//   const { type, cardId } = useParams(); // ✅ dynamic type
//   const { stories } = useOutletContext();
//   const language = useSelector((state) => state.language.language);

//   let cards = [];
//   if (type === "kids") {
//     cards = stories
//       .filter((s) => s.kids?.card?.length > 0)
//       .map((s) => s.kids.card)
//       .flat();
//   } else if (type === "toddler") {
//     cards = stories
//       .filter((s) => s.toddler?.card?.length > 0)
//       .map((s) => s.toddler.card)
//       .flat();
//   }

//   const card = cards.find((c) => c.id === cardId);

//   if (!card) {
//     return <p className="text-red-500">Card not found.</p>;
//   }

//   // return (
//   //   <div className="max-w-3xl mx-auto p-4">
//   //     {/* Title */}
//   //     <h1 className="text-2xl font-bold mb-2">
//   //       {card.title?.[language] || card.title?.en || "Untitled"}
//   //     </h1>

//   //     {/* Meta */}
//   //     <p className="text-gray-600 mb-4">
//   //       {card.description?.[language] || card.description?.en || ""}
//   //     </p>
//   //     <p className="text-sm text-gray-500">
//   //       {card.timeToRead?.[language] || card.timeToRead?.en || ""} ·{" "}
//   //       {card.storyType?.[language] || card.storyType?.en || ""}
//   //     </p>

//   //     {/* Cover */}
//   //     {card.coverImage && (
//   //       <img
//   //         src={card.coverImage}
//   //         alt="cover"
//   //         className="w-full rounded-lg shadow mb-6"
//   //       />
//   //     )}

//   //     {/* Part Content */}
//   //     <div className="space-y-6">
//   //       {card.partContent?.map((part) => (
//   //         <div
//   //           key={part.id}
//   //           className="flex flex-col md:flex-row gap-4 items-start"
//   //         >
//   //           {part.imageUrl && (
//   //             <img
//   //               src={part.imageUrl}
//   //               alt={
//   //                 part.headingText?.[language] ||
//   //                 part.oneLineText?.[language] ||
//   //                 ""
//   //               }
//   //               className="w-40 h-40 object-cover rounded"
//   //             />
//   //           )}
//   //           <div>
//   //             <h3 className="text-lg font-semibold">
//   //               {part.headingText?.[language] ||
//   //                 part.oneLineText?.[language] ||
//   //                 part.headingText?.en ||
//   //                 part.oneLineText?.en ||
//   //                 ""}
//   //             </h3>
//   //           </div>
//   //         </div>
//   //       ))}
//   //     </div>
//   //   </div>
//   // );

//     return (
//     <div className="max-w-3xl mx-auto p-4">
//       {/* Title */}
//       <h1 className="text-2xl font-bold mb-2">
//         {card.title?.[language] || card.title?.en || "Untitled"}
//       </h1>

//       {/* Meta Info */}
//       <p className="text-gray-600 mb-4">
//         {card.description?.[language] || card.description?.en || ""}
//       </p>
//       <p className="text-sm text-gray-500">
//         {card.timeToRead?.[language] || card.timeToRead?.en || ""} ·{" "}
//         {card.storyType?.[language] || card.storyType?.en || ""}
//       </p>

//       {/* Cover Image */}
//       {card.coverImage && (
//         <img
//           src={card.coverImage}
//           alt="cover"
//           className="w-full rounded-lg shadow mb-6"
//         />
//       )}

//       {/* Part Content */}
//       <div className="space-y-6">
//         {card.partContent?.map((part, index) => (
//           <div
//             key={part.id}
//             className="flex flex-col gap-4 items-start"
//           >
//             <div>
//               <h3 className="text-lg font-semibold">
//                 <span>{index+1+')'} </span>
//                 {part.headingText?.[language] ||
//                   part.oneLineText?.[language] ||
//                   part.headingText?.en ||
//                   part.oneLineText?.en ||
//                   ""}
//               </h3>
//             </div>
//             {part.imageUrl && (
//               <img
//                 src={part.imageUrl}
//                 alt={
//                   part.headingText?.[language] ||
//                   part.oneLineText?.[language] ||
//                   ""
//                 }
//                 className="object-cover rounded"
//               />
//             )}

//           </div>
//         ))}
//       </div>
//     </div>
//   );

// };

// export default StoryDetail;

import React, { useState, useRef, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { PageFlip } from "page-flip";
import sampleCovetImg from "../assets/Mahabharatha/mahabharathamCover.jpg";

const StoryDetail = () => {
  const { type, cardId } = useParams();
  const { stories } = useOutletContext();
  const language = useSelector((state) => state.language.language);
  const [mode, setMode] = useState("web"); // ✅ toggle state ("web" | "book")

  // ---- Get Card ----
  let cards = [];
  if (type === "kids") {
    cards = stories
      .filter((s) => s.kids?.card?.length > 0)
      .flatMap((s) => s.kids.card);
  } else if (type === "toddler") {
    cards = stories
      .filter((s) => s.toddler?.card?.length > 0)
      .flatMap((s) => s.toddler.card);
  }

  const card = cards.find((c) => c.id === cardId);

  if (!card) {
    return <p className="text-red-500">Card not found.</p>;
  }

  // ---- BOOK MODE (PageFlip) ----
  const bookRef = useRef(null);
  const pageFlipRef = useRef(null);

  useEffect(() => {
    if (mode !== "book") return;

    if (!bookRef.current) return;

    pageFlipRef.current = new PageFlip(bookRef.current, {
      width: 550,
      height: 733,
      size: "stretch",
      minWidth: 315,
      maxWidth: 1000,
      minHeight: 420,
      maxHeight: 1350,
      showCover: true,
    });

    const pages = bookRef.current.querySelectorAll(".page");
    if (pages.length > 0) {
      pageFlipRef.current.loadFromHTML(pages);
    }

    return () => {
      pageFlipRef.current?.destroy();
    };
  }, [mode]);

  // ---- RENDER ----
  return (
    <div className="relative max-w-4xl mx-auto p-4">
      {/* ---- Toggle Floating Button ---- */}
      <button
        onClick={() => setMode(mode === "web" ? "book" : "web")}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg transition"
      >
        {mode === "web" ? "📖 Book Mode" : "💻 Web Mode"}
      </button>

      {mode === "web" ? (
        // ---- WEB MODE ----
        <>
          <h1 className="text-2xl font-bold mb-2">
            {card.title?.[language] || card.title?.en || "Untitled"}
          </h1>

          <p className="text-gray-600 mb-4">
            {card.description?.[language] || card.description?.en || ""}
          </p>
          <p className="text-sm text-gray-500">
            {card.timeToRead?.[language] || card.timeToRead?.en || ""} ·{" "}
            {card.storyType?.[language] || card.storyType?.en || ""}
          </p>

          {card.coverImage && (
            <img
              src={card.coverImage}
              alt="cover"
              className="w-full rounded-lg shadow mb-6"
            />
          )}

          <div className="space-y-6">
            {card.partContent?.map((part, index) => (
              <div key={part.id} className="flex flex-col gap-4 items-start">
                <h3 className="text-lg font-semibold">
                  <span>{index + 1}) </span>
                  {part.headingText?.[language] ||
                    part.oneLineText?.[language] ||
                    part.headingText?.en ||
                    part.oneLineText?.en ||
                    ""}
                </h3>
                {part.imageUrl && (
                  <img
                    src={part.imageUrl}
                    alt={
                      part.headingText?.[language] ||
                      part.oneLineText?.[language] ||
                      ""
                    }
                    className="object-cover rounded"
                  />
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        // ---- BOOK MODE ----
        <div className="story-container">
          <div className="flip-book" ref={bookRef}>
            {/* Cover */}
            <div className="page page-cover page-cover-top" data-density="hard">
              {/* <div className="page-content">
              </div> */}
              <div>
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    {card.title?.[language] || card.title?.en || "Untitled"}
                  </h1>

                  <p className="text-gray-600">
                    {card.description?.[language] || card.description?.en || ""}
                  </p>
                  <p className="text-sm text-gray-500">
                    {card.timeToRead?.[language] || card.timeToRead?.en || ""} ·{" "}
                    {card.storyType?.[language] || card.storyType?.en || ""}
                  </p>
                </div>
                {/* <img src={sampleCovetImg} alt="" /> */}
                <img className="rounded-md h-[500px]" src='https://res.cloudinary.com/dwhmqaqhj/image/upload/v1745407365/Chiaroscuro_lighting_depicts_Vasudev_dark_skin_carrying_a_basket_with_baby_Krishna_walking_through_a_stormy_night._Strong_contrasts_and_deep_shadows._Lightning_illuminates_the_flooded_forest_path._Baby_Krishna_ixttrv.jpg' alt="" />
              </div>
            </div>

            {/* Pages from partContent */}
            {card.partContent?.map((part, index) => (
              <div className="page" key={index} data-density="soft">
                <div className="page-content">
                  <h2 className="page-header">Page {index + 1}</h2>
                  {part.imageUrl && (
                    <div
                      className="page-image"
                      style={{
                        backgroundImage: `url(${part.imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "300px",
                      }}
                    ></div>
                  )}
                  <div className="page-text">
                    {part.headingText?.[language] ||
                      part.oneLineText?.[language] ||
                      ""}
                  </div>
                  <div className="page-footer">{index + 2}</div>
                </div>
              </div>
            ))}

            {/* Back Cover */}
            <div
              className="page page-cover page-cover-bottom"
              data-density="hard"
            >
              <div className="page-content">
                <h2>The End</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryDetail;
