import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./languageSlice"; // Import your reducer

const store = configureStore({
  reducer: {
    language: languageReducer, // Add your reducers here
  },
});

export default store;
