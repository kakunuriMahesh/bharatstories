// src/store/readerSettingsSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial values from localStorage or defaults
const initialFontSize = parseInt(localStorage.getItem("fontSize")) || 16;
const initialTheme = localStorage.getItem("theme") || "light";

const readerSettingsSlice = createSlice({
  name: "readerSettings",
  initialState: {
    fontSize: initialFontSize, // Default: 16px
    theme: initialTheme, // Default: light
  },
  reducers: {
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
      localStorage.setItem("fontSize", action.payload); // Persist font size
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload); // Persist theme
      document.body.className = `theme-${action.payload}`; // Apply theme globally
    },
  },
});

export const { setFontSize, setTheme } = readerSettingsSlice.actions;
export default readerSettingsSlice.reducer;