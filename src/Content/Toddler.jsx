import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeBanner from "./HomeBanner";
import { useStoriesContext } from "./Layout";

const Toddler = () => {
  const [story, setStory] = useState(null);
  const { stories, loading } = useStoriesContext();
  const toddlerStories = stories.filter((s) => s.toddler?.card?.length > 0);
  const card = toddlerStories.map((story) => story.toddler.card).flat();

  const { name } = useParams();
  const language = useSelector((state) => state.language.language);
  const navigate = useNavigate();

  const cleanName = decodeURIComponent(name);

  useEffect(() => {
    if (name) {
      const findStory = stories.find((story) => story?.name?.en === cleanName);
      setStory(findStory);
    }
  }, [name, stories]);

  // 🔹 Navigate to detail page when card is clicked
  const handleCardClick = (cardTitle) => {
    navigate(`/toddler/${encodeURIComponent(cardTitle)}`);
  };
  console.log("Toddler stories:", toddlerStories);
  
  // Show loading state
  if (loading) {
    return null; // Layout will handle the shimmer
  }

  return stories ? (
    <div className="mt-[10px] px-[20px] pb-[20px] flex justify-center flex-col items-center">
      <HomeBanner />
      <div className="flex flex-col gap-6">
        {toddlerStories.length > 0 ? (
          toddlerStories
            .filter((story) => {
              // Only show story if it has cards with content in selected language
              return story.toddler.card.some((storyCard) =>
                storyCard.title?.[language] &&
                storyCard.description?.[language] &&
                storyCard.storyType?.[language] &&
                storyCard.timeToRead?.[language]
              );
            })
            .map((story) => (
            <div key={story.id} className="mb-6">
              <h2 className="text-2xl font-bold mb-4">
                {story.name?.[language] || story.name?.en || "Untitled"}
              </h2>
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {story.toddler.card.map((storyCard) => (
                  <div 
                    key={storyCard.id}
                    className="bg-white rounded shadow p-4 transition cursor-pointer hover:shadow-lg"
                    onClick={() => handleCardClick(storyCard.id)}
                  >
                    <img src={storyCard.thumbnailImage || ''} alt="check"/>
                    <h2 className="text-lg font-semibold mb-2">
                      {storyCard.title?.[language] || storyCard.title?.en || "Untitled"}
                    </h2>

                    <p className="text-sm text-gray-600">
                      {storyCard.description?.[language] ||
                        storyCard.description?.en ||
                        ""}
                    </p>
                  </div>
                ))}
              </div> */}
              <div className="my-[10px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {story.toddler.card
                  .filter((storyCard) =>
                    storyCard.title?.[language] &&
                    storyCard.description?.[language] &&
                    storyCard.storyType?.[language] &&
                    storyCard.timeToRead?.[language]
                  )
                  .map((storyCard, index) => (
                  <div
                    key={storyCard.id}
                    onClick={() => handleCardClick(storyCard.title[language] || storyCard.title.en)}
                    className="w-full max-w-[350px] mx-auto border-2 rounded-[20px] cursor-pointer hover:scale-[1.02] hover:duration-700 shadow-sm"
                  >
                    <div className="h-full bg-slate-200 dark:bg-slate-800 rounded-[20px] flex flex-col justify-between">
                      {/* Thumbnail */}
                      <img
                        className="w-full h-[200px] md:h-[250px] object-cover rounded-tr-[20px] rounded-tl-[20px]"
                        src={storyCard.thumbnailImage || "/placeholder.jpg"}
                        alt={storyCard.title?.[language] || "Thumbnail"}
                      />

                      {/* Story type + Part info */}
                      <div className="border-l-4 border-y-0 border-r-0 my-3 border-solid border-l-[#008080] dark:border-l-[#00F0FF] flex items-center justify-between font-extrabold text-[#008080] dark:text-[#00F0FF] bg-white dark:bg-[#0080807a]">
                        <p className="px-5 py-1 text-sm font-semibold">
                          {storyCard.storyType?.[language] ||
                            storyCard.storyType?.en ||
                            ""}
                        </p>
                        <p className="px-5 text-sm font-semibold">
                          Card-{index + 1}
                        </p>
                      </div>

                      {/* Title + Description */}
                      <div className="px-5">
                        <h2 className="text-base font-bold md:text-lg">
                          {storyCard.title?.[language] ||
                            storyCard.title?.en ||
                            "Untitled"}
                        </h2>
                        <p className="text-sm mt-2 md:text-base text-gray-700 dark:text-gray-300">
                          {(
                            storyCard.description?.[language] ||
                            storyCard.description?.en ||
                            ""
                          ).slice(0, 90)}
                          ...
                        </p>
                      </div>

                      {/* Time to read */}
                      <p className="p-5 pb-3 text-sm text-gray-600 dark:text-gray-400">
                        {storyCard.timeToRead?.[language] ||
                          storyCard.timeToRead?.en ||
                          ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No toddler stories available.</p>
        )}
        {/* {card.map((storyCard) => (
        <div
          key={storyCard.id}
          className="bg-white rounded shadow p-4 transition cursor-pointer hover:shadow-lg"
          onClick={() => handleCardClick(storyCard.id)}
        >
          <h2 className="text-lg font-semibold mb-2">
            {storyCard.title?.[language] || storyCard.title?.en || "Untitled"}
          </h2>

          <p className="text-sm text-gray-600">
            {storyCard.description?.[language] ||
              storyCard.description?.en ||
              ""}
          </p>
        </div>
      ))} */}
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Toddler;
