import { createSlice } from "@reduxjs/toolkit";

const onboardingAddVideoBioSlice = createSlice({
  name: "onboardingAddVideoBio",
  initialState: {
    uri: null, // URI of camera video
    previewUri: null, // URI of preview video
  },
  reducers: {
    setOnboardingVideoBio: (state, action) => {
      state.uri = action.payload;
    },
    setPreviewOnboardingVideoBio: (state, action) => {
      state.previewUri = action.payload;
    },
  },
});

export const {
  setOnboardingVideoBio,
  setPreviewOnboardingVideoBio,
} = onboardingAddVideoBioSlice.actions;

export default onboardingAddVideoBioSlice.reducer;
