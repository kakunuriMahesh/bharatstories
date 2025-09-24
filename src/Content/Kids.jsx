
import React, { useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Kids = () => {
  const [story, setStory] = useState(null);
  const { stories } = useOutletContext();
  const kidsStories = stories.filter((s) => s.kids?.card?.length > 0);
  const card = kidsStories.map((story) => story.kids.card).flat();

  const { name } = useParams();
  const language = useSelector((state) => state.language.language);
  const navigate = useNavigate();

  const cleanName = decodeURIComponent(name);

  useEffect(() => {
    if (name) {
      const findStory = stories.find(
        (story) => story?.name?.en === cleanName
      );
      setStory(findStory);
    }
  }, [name, stories]);

  const handleCardClick = (cardId) => {
    navigate(`/kids/${cardId}`);
  };

  return stories ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {card.map((storyCard) => (
        <div
          key={storyCard.id}
          className="bg-white rounded shadow p-4 cursor-pointer hover:shadow-lg"
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
      ))}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Kids;
