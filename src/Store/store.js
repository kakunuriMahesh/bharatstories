import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./languageSlice"; // Your existing slice
import readerSettingsReducer from "./readerSettingsSlice"; // New slice

const store = configureStore({
  reducer: {
    language: languageReducer, // Existing language slice
    readerSettings: readerSettingsReducer, // New reader settings slice
  },
});

export default store;


// FIXME:
// import { configureStore } from "@reduxjs/toolkit";
// import languageReducer from "./languageSlice"; // Import your reducer

// const store = configureStore({
//   reducer: {
//     language: languageReducer, // Add your reducers here
//   },
// });

// export default store;
