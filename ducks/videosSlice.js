import { createSlice } from '@reduxjs/toolkit';


const videosSlice = createSlice({
  name: 'videos',
  initialState: {
    byId: {

    }
  },
  reducers: {
    addVideo: (state, action) => {
      if (!state.byId.hasOwnProperty(action.payload.video.id)) {
        // If video entry is non-existent, add entry
        state.byId[action.payload.video.id] = {}
      }
      // Populate/Update video entry
      state.byId[action.payload.video.id] = {...state.byId[action.payload.video.id], ...action.payload.video}
    },
  },
})

export const { addVideo } = videosSlice.actions;

export default videosSlice.reducer;
