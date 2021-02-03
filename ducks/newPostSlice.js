import { createSlice } from "@reduxjs/toolkit";

const newPostSlice = createSlice({
  name: "newPost",
  initialState: {
    uri: null,
  },
  reducers: {
    setVideoUri: (state, action) => {
      state.uri = action.payload;
    },
  },
});

export const { setVideoUri } = newPostSlice.actions;

export default newPostSlice.reducer;
