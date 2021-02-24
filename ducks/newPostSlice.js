import { createSlice } from "@reduxjs/toolkit";

export function postCreateThunk(data) {
  return function (dispatch, getState) {
    dispatch(setAddPostFormSubmittingStatus("pending"));

    const PostsService = require("../services/api/posts/PostsService");
    const postsService = new PostsService();

    postsService
      .create(data)
      .then((response) => {
        dispatch(setAddPostFormSubmittingStatus("fulfilled"));
        dispatch(setShowSucessPopUp(true));

        // Reset form
        dispatch(setNewPostVideo(null))
        dispatch(setNewPostCommentTo(null))
      })
      .catch((error) => {
        dispatch(setAddPostFormSubmittingStatus("rejected"));
      })
  }
};

const newPostSlice = createSlice({
  name: "newPost",
  initialState: {
    video: null,
    previewVideo: null,
    commentTo: null,
    formSubmittingStatus: "inactive", // 'inactive' || 'pending' || 'fulfilled' || 'rejected'
    formError: null,
    showSucessPopUp: false,
  },
  reducers: {
    setNewPostVideo: (state, action) => {
      state.video = action.payload;
    },
    setNewPostCommentTo: (state, action) => {
      state.commentTo = action.payload;
    },
    setAddPostFormSubmittingStatus: (state, action) => {
      state.formSubmittingStatus = action.payload;
    },
    setAddPostFormError: (state, action) => {
      state.formError = action.payload;
    },
    setShowSucessPopUp: (state, action) => {
      state.showSucessPopUp = action.payload;
    }
  },
});

export const {
  setNewPostVideo,
  setNewPostCommentTo,
  setAddPostFormSubmittingStatus,
  setAddPostFormError,
  setShowSucessPopUp,
} = newPostSlice.actions;

export default newPostSlice.reducer;
