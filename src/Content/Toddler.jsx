import React, { useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Toddler = () => {
  const [story, setStory] = useState(null);
  const { stories } = useOutletContext();
  const toddlerStories = stories.filter((s) => s.toddler?.card?.length > 0);
  const card = toddlerStories.map((story) => story.toddler.card).flat();

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

  // 🔹 Navigate to detail page when card is clicked
  const handleCardClick = (cardId) => {
    navigate(`/toddler/${cardId}`);
  };

  return stories ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {card.map((storyCard) => (
        <div
          key={storyCard.id}
          className="bg-white rounded shadow p-4 transition cursor-pointer hover:shadow-lg"
          onClick={() => handleCardClick(storyCard.id)}
        >
          {/* Card Title */}
          <h2 className="text-lg font-semibold mb-2">
            {storyCard.title?.[language] || storyCard.title?.en || "Untitled"}
          </h2>

          {/* Description */}
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

export default Toddler;
