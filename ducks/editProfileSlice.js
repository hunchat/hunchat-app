import { createSlice } from "@reduxjs/toolkit";
import camelcaseKeys from "camelcase-keys";

import { addUser } from "./usersSlice";

export function updateUserThunk(data) {
  return function (dispatch, getState) {
    dispatch(setFormSubmittingStatus("pending"));

    const UsersService = require("../services/api/authentication/UsersService");
    const usersService = new UsersService();

    const { currentUserId } = getState().users;

    usersService
      .partialUpdate(currentUserId, data)
      .then((response) => {
        const camelcaseUser = camelcaseKeys(response.data, { nested: true });
        dispatch(addUser({ user: camelcaseUser }));
        dispatch(setFormSubmittingStatus("fulfilled"));
      })
      .catch((error) => {
        dispatch(setFormSubmittingStatus("rejected"));
      });
  };
}

export function updateUserBioVideoThunk(data) {
  return function (dispatch, getState) {
    dispatch(setFormSubmittingStatus("pending"));

    const UsersService = require("../services/api/authentication/UsersService");
    const usersService = new UsersService();

    const { currentUserId } = getState().users;

    usersService
      .bioVideoUpdate(currentUserId, data)
      .then((response) => {
        const camelcaseUser = camelcaseKeys(response.data, { nested: true });
        dispatch(addUser({ user: camelcaseUser }));
        dispatch(setFormSubmittingStatus("fulfilled"));
        dispatch(setEditBioVideo(null)); // reset form state
      })
      .catch((error) => {
        dispatch(setFormSubmittingStatus("rejected"));
      });
  };
}

export function updateUserImageThunk(data) {
  return function (dispatch, getState) {
    dispatch(setFormSubmittingStatus("pending"));

    const UsersService = require("../services/api/authentication/UsersService");
    const usersService = new UsersService();

    const { currentUserId } = getState().users;

    usersService
      .imageUpdate(currentUserId, data)
      .then((response) => {
        dispatch(setFormSubmittingStatus("fulfilled"));
      })
      .catch((error) => {
        dispatch(setFormSubmittingStatus("rejected"));
      });
  };
}

const editProfileSlice = createSlice({
  name: "editProfile",
  initialState: {
    bioVideo: null,
    bioVideoPreview: null,
    formSubmittingStatus: "inactive", // 'inactive' || 'pending' || 'fulfilled' || 'rejected'
    formError: null,
  },
  reducers: {
    setEditBioVideo: (state, action) => {
      state.bioVideo = action.payload;
    },
    setEditBioVideoPreview: (state, action) => {
      state.bioVideoPreview = action.payload;
    },
    setFormSubmittingStatus: (state, action) => {
      state.formSubmittingStatus = action.payload;
    },
  },
});

export const {
  setEditBioVideo,
  setEditBioVideoPreview,
  setFormSubmittingStatus,
} = editProfileSlice.actions;

export default editProfileSlice.reducer;
