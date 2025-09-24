// store/profileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    selected: null, // {id, label, avatar, type}
  },
  reducers: {
    setProfile: (state, action) => {
      state.selected = action.payload;
      localStorage.setItem("selectedProfile", JSON.stringify(action.payload));
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
