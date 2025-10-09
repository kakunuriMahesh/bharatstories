import React, { useEffect, useState } from "react";
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
    id: "child",
    label: "Child",
    avatar: "https://img.icons8.com/color/96/child-safe-zone.png",
    type: "adult",
  },
  {
    id: "teen",
    label: "Teen",
    avatar: "https://img.icons8.com/color/96/teenager-male.png",
    type: "adult",
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
  const [flyingAvatar, setFlyingAvatar] = useState(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("selectedProfile");
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      dispatch(setProfile(parsedProfile));
    } else {
      navigate("/");
    }
  }, [dispatch, navigate]);

  const handleProfileClick = (profile) => {
    dispatch(setProfile(profile));
    localStorage.setItem("selectedProfile", JSON.stringify(profile));
    setFlyingAvatar(profile);

    setTimeout(() => {
      if (profile.id === "toddler") navigate("/toddler");
      else if (profile.id === "kids") navigate("/kids");
      else navigate("/home");
      setFlyingAvatar(null);
    }, 900);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-[#0a0a0a] dark:via-[#1a1a1a] dark:to-[#111]">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Who’s Watching?
      </h1>

      {/* Profile Circles */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
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
            {/* Profile Card */}
            <div
              className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center border-4 shadow-lg backdrop-blur-xl transition-all duration-500 ${
                selectedProfile?.id === profile.id
                  ? "border-emerald-500 bg-white/70"
                  : "border-transparent bg-white/40 hover:bg-white/60"
              }`}
            >
              <img
                src={profile.avatar}
                alt={profile.label}
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
              />

              {/* ✅ Tick Mark — perfectly aligned top-right */}
              {selectedProfile?.id === profile.id && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-sm w-6 h-6 flex items-center justify-center rounded-full shadow-md">
                  ✓
                </span>
              )}
            </div>

            {/* Label */}
            <p
              className={`mt-3 text-lg sm:text-xl font-medium tracking-wide ${
                selectedProfile?.id === profile.id
                  ? "text-emerald-600"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {profile.label}
            </p>
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
            className="w-24 h-24 rounded-full absolute z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileSwitcher;
