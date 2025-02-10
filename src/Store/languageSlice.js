import { createSlice } from "@reduxjs/toolkit";

const initialLanguage = localStorage.getItem("language") || "en";

const languageSlice = createSlice({
  name: "language",
  initialState: { language: initialLanguage, menuState: false },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;

      localStorage.setItem("language", action.payload); // Persist language
    },
    setMenuState: (state, action) => {
      state.menuState = action.payload;
    }
    
  },
});

export const { setLanguage,setMenuState } = languageSlice.actions;
export default languageSlice.reducer;
