import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { StoryShimmer } from "../components/Loading/storyShimmer";
import handleScrollToTop from "../Theme/HandleSmoothScroll";
import YourComponent from "../components/YourComponent";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const SearchDetailStory = () => {
  const [story, setStory] = useState(null);
  const [currentStoryParts, setCurrentStoryParts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [nextStoryTitle, setNextStoryTitle] = useState("");
  const [targettedStories, setTargettedStories] = useState([]);
  const [availableModes, setAvailableModes] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  // 🧲 Floating button state
  const [position, setPosition] = useState({
    x: 60,
    y: window.innerHeight / 2,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isRightSide, setIsRightSide] = useState(false);

  const { stories } = useOutletContext();
  const { title } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const language = useSelector((state) => state.language.language);
  const { fontSize, theme } = useSelector((state) => state.readerSettings);
  const targettedAgeGroup = useSelector((state) => state.profile.selected);

  let getSelectedAge = localStorage.getItem("selectedProfile");
  getSelectedAge = JSON.parse(getSelectedAge) || {};

  const modes = ["child", "teen", "adult"];
  const [currentAgeGroup, setCurrentAgeGroup] = useState(() => {
    let initial = getSelectedAge.id;
    if (!modes.includes(initial)) initial = "child";
    return initial;
  });

  const themeStyles = {
    light: { backgroundColor: "#ffffff", color: "#000000" },
    dark: { backgroundColor: "#1a1a1a", color: "#ffffff" },
    calm: { backgroundColor: "#f5f5d5", color: "#4a4a4a" },
  };

  const cleanName = title.startsWith(":") ? title.slice(1) : title;

  const handleSwitchMode = (newAgeGroup) => {
    setCurrentAgeGroup(newAgeGroup);
    setShowMenu(false);
    console.log("Switched to age group:", newAgeGroup);
  };

  // 🧲 Drag logic for floating button
  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const startX = e.clientX || e.touches?.[0]?.clientX;
    const startY = e.clientY || e.touches?.[0]?.clientY;

    const handleDragMove = (moveEvent) => {
      const clientX = moveEvent.clientX || moveEvent.touches?.[0]?.clientX;
      const clientY = moveEvent.clientY || moveEvent.touches?.[0]?.clientY;

      setPosition({
        x: Math.min(window.innerWidth - 40, Math.max(40, clientX)),
        y: Math.min(window.innerHeight - 40, Math.max(40, clientY)),
      });
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      setIsRightSide(position.x > window.innerWidth / 2);
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("touchend", handleDragEnd);
    };

    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDragMove);
    document.addEventListener("touchend", handleDragEnd);
  };

  // Compute available modes
  useEffect(() => {
    if (stories && cleanName) {
      const avail = [];
      if (
        stories.some((s) =>
          s.child?.card?.some((part) =>
            [part.title.en, part.title.te, part.title.hi].includes(cleanName)
          )
        )
      ) {
        avail.push("child");
      }
      if (
        stories.some((s) =>
          s.teen?.card?.some((part) =>
            [part.title.en, part.title.te, part.title.hi].includes(cleanName)
          )
        )
      ) {
        avail.push("teen");
      }
      if (
        stories.some((s) =>
          s.parts?.card?.some((part) =>
            [part.title.en, part.title.te, part.title.hi].includes(cleanName)
          )
        )
      ) {
        avail.push("adult");
      }
      setAvailableModes(avail);
      console.log("Available modes for title:", cleanName, avail);

      if (avail.length > 0 && !avail.includes(currentAgeGroup)) {
        setCurrentAgeGroup(avail[0]);
      }
    }
  }, [stories, cleanName]);

  // Filter stories by current age group
  useEffect(() => {
    let filteredStories = [];
    if (currentAgeGroup === "child") {
      filteredStories = stories.filter((s) => s.child?.card?.length > 0);
    } else if (currentAgeGroup === "teen") {
      filteredStories = stories.filter((s) => s.teen?.card?.length > 0);
    } else {
      filteredStories = stories;
    }
    setTargettedStories(filteredStories);
  }, [currentAgeGroup, stories]);

  // Load story based on title + age group
  useEffect(() => {
    if (title && targettedStories.length > 0) {
      let currentStory = null;
      let currentPart = null;

      if (currentAgeGroup === "child") {
        currentStory = targettedStories.find((s) =>
          s.child.card.some((part) =>
            [part.title.en, part.title.te, part.title.hi].includes(cleanName)
          )
        );
        if (currentStory) {
          setCurrentStoryParts(currentStory.child.card);
          currentPart = currentStory.child.card.find((part) =>
            [part.title.en, part.title.te, part.title.hi].includes(cleanName)
          );
        }
      } else if (currentAgeGroup === "teen") {
        currentStory = targettedStories.find((s) =>
          s.teen.card.some((part) =>
            [part.title.en, part.title.te, part.title.hi].includes(cleanName)
          )
        );
        if (currentStory) {
          setCurrentStoryParts(currentStory.teen.card);
          currentPart = currentStory.teen.card.find((part) =>
            [part.title.en, part.title.te, part.title.hi].includes(cleanName)
          );
        }
      } else {
        currentStory = targettedStories.find((s) =>
          s.parts.card.some((part) =>
            [part.title.en, part.title.te, part.title.hi].includes(cleanName)
          )
        );
        if (currentStory) {
          setCurrentStoryParts(currentStory.parts.card);
          currentPart = currentStory.parts.card.find((part) =>
            [part.title.en, part.title.te, part.title.hi].includes(cleanName)
          );
        }
      }

      setStory(currentPart || null);
    }
  }, [title, targettedStories, cleanName, currentAgeGroup]);

  const getCurrentIndex = () => {
    return currentStoryParts.findIndex((part) =>
      [part.title.en, part.title.te, part.title.hi].includes(cleanName)
    );
  };

  const handleNext = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex < currentStoryParts.length - 1) {
      const nextPart = currentStoryParts[currentIndex + 1];
      navigate(`/detailstory/${nextPart.title[language]}`);
      handleScrollToTop();
    } else {
      const currentStoryIndex = targettedStories.findIndex((s) =>
        (s.child?.card || s.teen?.card || s.parts?.card || []).some(
          (p) => p.title[language] === cleanName
        )
      );
      if (currentStoryIndex < targettedStories.length - 1) {
        const nextStory = targettedStories[currentStoryIndex + 1];
        let firstCard =
          nextStory?.child?.card?.[0] ||
          nextStory?.teen?.card?.[0] ||
          nextStory?.parts?.card?.[0];
        setNextStoryTitle(firstCard?.title[language]);
        setShowPopup(true);
      }
    }
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex > 0) {
      const prevPart = currentStoryParts[currentIndex - 1];
      navigate(`/detailstory/${prevPart.title[language]}`);
      handleScrollToTop();
    }
  };

  const handlePopupConfirm = () => {
    setShowPopup(false);
    navigate(`/detailstory/${nextStoryTitle}`);
    handleScrollToTop();
  };

  const isLoading = !story || currentStoryParts.length === 0;
  const showFloatingButton = availableModes.length > 1;

  return (
    <div
      style={{
        ...themeStyles[theme],
        fontSize: `${fontSize}px`,
        padding: "20px",
        minHeight: "100vh",
      }}
      className="px-[20px] pb-[20px] relative"
    >
      {/* 🧲 Draggable Floating Button */}
      {showFloatingButton && (
        <div
          className="fixed z-50"
          style={{
            top: `${position.y}px`,
            left: `${position.x}px`,
            transform: "translate(-50%, -50%)",
            transition: isDragging ? "none" : "transform 0.2s ease",
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <div
            className={`flex items-center backdrop-blur-lg bg-[rgba(30,30,30,0.45)] border border-white/20 shadow-lg rounded-2xl transition-all duration-500 ease-in-out ${
              isRightSide
                ? "flex-row-reverse rounded-l-2xl"
                : "flex-row rounded-r-2xl"
            }`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-3 text-white hover:text-emerald-300 transition-colors cursor-pointer"
            >
              {isRightSide ? (
                showMenu ? (
                  <IoIosArrowForward size={22} />
                ) : (
                  <IoIosArrowBack size={22} />
                )
              ) : showMenu ? (
                <IoIosArrowBack size={22} />
              ) : (
                <IoIosArrowForward size={22} />
              )}
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out flex items-center ${
                showMenu ? "w-auto opacity-100 px-2" : "w-0 opacity-0"
              } ${isRightSide ? "flex-row-reverse" : "flex-row"}`}
            >
              {availableModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleSwitchMode(mode)}
                  className={`px-4 py-2 mx-1 rounded-lg text-sm font-medium capitalize transition-all duration-300
                    ${
                      currentAgeGroup === mode
                        ? "bg-emerald-600/90 text-white shadow-md"
                        : "bg-white/10 text-gray-100 hover:bg-white/20"
                    }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <StoryShimmer />
      ) : story?.part ? (
        <div className="md:px-[50px] pb-[20px]">
          <div className="flex flex-col items-center justify-center p-[10px] w-[100%]">
            <p>{story.storyType?.[language]}</p>
            <h3 className="font-bold mb-[5px]">{story.title[language]}</h3>
            <img
              src={story.thumbnailImage}
              className="md:h-[450px] h-fit object-cover rounded-lg w-full"
              alt="thumbnail"
            />
          </div>

          <YourComponent story={story} language={language} />

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
          <p>No story found in {currentAgeGroup} age group.</p>
        </div>
      )}

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
