// src/components/ReaderControls.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFontSize, setTheme } from "../store/readerSettingsSlice";

const ReaderControls = () => {
  const dispatch = useDispatch();
  const { fontSize, theme } = useSelector((state) => state.readerSettings);
  const [isOpen, setIsOpen] = useState(false); // State to toggle visibility
  const controlsRef = useRef(null); // Ref to detect outside clicks

  // Font size handlers
  const increaseFontSize = () => {
    dispatch(setFontSize(Math.min(fontSize + 2, 32))); // Max: 32px
  };

  const decreaseFontSize = () => {
    dispatch(setFontSize(Math.max(fontSize - 2, 18))); // Min: 18px
  };

  // Theme handler
  const changeTheme = (newTheme) => {
    dispatch(setTheme(newTheme));
  };

  // Toggle visibility
  const toggleControls = () => {
    setIsOpen(!isOpen);
  };

  // Close controls when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (controlsRef.current && !controlsRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Theme styles for the component
  const themeStyles = {
    light: { backgroundColor: "#ffffff", color: "#000000" },
    dark: { backgroundColor: "#1a1a1a", color: "#ffffff" },
    calm: { backgroundColor: "#f5f5d5", color: "#4a4a4a" },
  };

  return (
    <div className="fixed right-4 bottom-3 z-10">
      {/* Icon to toggle controls */}
      <button
        onClick={toggleControls}
        style={{
          padding: "10px",
          borderRadius: "50%",
          background: themeStyles[theme].backgroundColor,
          color: themeStyles[theme].color,
          border: "1px solid #ccc",
        }}
      >
        ⚙️ {/* You can replace this with an icon from a library like FontAwesome */}
      </button>

      {/* Controls panel (shown when isOpen is true) */}
      {isOpen && (
        <div
          ref={controlsRef}
          style={{
            ...themeStyles[theme],
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            position: "absolute",
            bottom: "50px", // Position above the icon
            right: "0",
            background: themeStyles[theme].backgroundColor,
          }}
        >
          {/* Font Size Controls */}
          <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
            <button
              onClick={decreaseFontSize}
              style={{ marginRight: "10px", padding: "5px 10px", fontSize: "14px" }}
              disabled={fontSize <= 12}
            >
              A {/* Small A */}
            </button>
            {/* <span style={{ fontSize: `${fontSize}px` }}>A</span> */}
            <button
              onClick={increaseFontSize}
              style={{ marginLeft: "10px", padding: "5px 10px", fontSize: "20px" }}
              disabled={fontSize >= 32}
            >
              A {/* Big A */}
            </button>
          </div>

          {/* Theme Controls */}
          <div>
            <button
              onClick={() => changeTheme("light")}
              style={{
                borderRadius:"5px",
                marginBottom: "5px",
                marginRight: "5px",
                padding: "5px 15px",
                background: theme === "light" ? "#ccc" : "#fff",
              }}
            >
              Light
            </button>
            <button
              onClick={() => changeTheme("dark")}
              style={{
                borderRadius:"5px",
                marginBottom: "5px",
                marginRight: "5px",
                padding: "5px 15px",
                background: theme === "dark" ? "#ccc" : "#fff",
              }}
            >
              Dark
            </button>
            <button
              onClick={() => changeTheme("calm")}
              style={{
                borderRadius:"5px",
                padding: "5px 15px",
                background: theme === "calm" ? "#ccc" : "#fff",
              }}
            >
              Calm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReaderControls;