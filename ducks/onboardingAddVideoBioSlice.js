import { createSlice } from "@reduxjs/toolkit";

const onboardingAddVideoBioSlice = createSlice({
  name: "onboardingAddVideoBio",
  initialState: {
    video: null,
    previewVideo: null, // URI of preview video
  },
  reducers: {
    setOnboardingVideoBio: (state, action) => {
      state.video = action.payload;
    },
    setPreviewOnboardingVideoBio: (state, action) => {
      state.previewVideo = action.payload;
    },
  },
});

export const {
  setOnboardingVideoBio,
  setPreviewOnboardingVideoBio,
} = onboardingAddVideoBioSlice.actions;

export default onboardingAddVideoBioSlice.reducer;
