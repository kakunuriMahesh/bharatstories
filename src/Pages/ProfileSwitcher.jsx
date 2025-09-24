import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../Store/profileSlice";
import { motion, AnimatePresence } from "framer-motion";

const profiles = [
  {
    id: "toddler",
    label: "Toddler",
    avatar: "https://img.icons8.com/color/96/baby.png",
    type: "children",
  },
  {
    id: "kids",
    label: "Kids",
    avatar: "https://img.icons8.com/color/96/children.png",
    type: "children",
  },
  {
    id: "adult",
    label: "Adult",
    avatar: "https://img.icons8.com/color/96/user-male-circle.png",
    type: "adult",
  },
];

const ProfileSwitcher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedProfile = useSelector((state) => state.profile.selected);

  // Local state only for flying animation
  const [flyingAvatar, setFlyingAvatar] = useState(null);

  const handleProfileClick = (profile) => {
    dispatch(setProfile(profile)); // Save in Redux
    setFlyingAvatar(profile); // Trigger flying animation

    // Navigate after animation delay (so user sees it)
    setTimeout(() => {
      if (profile.id === "toddler") {
        navigate("/toddler");
      } else if (profile.id === "kids") {
        navigate("/kids");
      } else {
        navigate("/home");
      }
      setFlyingAvatar(null); // reset after navigation
    }, 900);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 relative overflow-hidden">
      <h1 className="text-3xl font-bold mb-6">Who's Watching?</h1>

      {/* Profile Circles */}
      <div className="flex gap-6">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className={`flex flex-col items-center cursor-pointer relative transition-transform ${
              selectedProfile?.id === profile.id
                ? "scale-110"
                : "hover:scale-105"
            }`}
            onClick={() => handleProfileClick(profile)}
          >
            <div
              className={`w-24 h-24 rounded-full overflow-hidden border-4 transition relative flex items-center justify-center ${
                selectedProfile?.id === profile.id
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              <img
                src={profile.avatar}
                alt={profile.label}
                className="w-full h-full object-cover"
              />
              {/* ✅ Tick mark inside circle (fixed cutting issue) */}
              {selectedProfile?.id === profile.id && (
                <span className="absolute bottom-1 right-1 bg-blue-500 text-white text-sm px-1.5 py-0.5 rounded-full shadow-lg">
                  ✓
                </span>
              )}
            </div>
            <p className="mt-2 text-lg">{profile.label}</p>
          </div>
        ))}
      </div>

      {/* Flying Avatar Animation */}
      <AnimatePresence>
        {flyingAvatar && (
          <motion.img
            key={flyingAvatar.id}
            src={flyingAvatar.avatar}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{ x: 950, y: -200, scale: 0.4, opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-24 h-24 rounded-full absolute z-50"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileSwitcher;