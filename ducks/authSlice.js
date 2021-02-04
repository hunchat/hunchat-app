import { createSlice } from "@reduxjs/toolkit";

/**
 * Stores user authentication tokens.
 */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    refreshToken: null,
    signInFormSubmittingStatus: "inactive", // 'inactive' || 'pending' || 'fulfilled' || 'rejected'
    signInFormError: null,
    signUpFormSubmittingStatus: "inactive", // 'inactive' || 'pending' || 'fulfilled' || 'rejected'
    signUpFormError: null,
  },
  reducers: {
    setTokenPair: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setSignInFormSubmittingStatus: (state, action) => {
      state.signInFormSubmittingStatus = action.payload;
    },
    setSignInFormError: (state, action) => {
      state.signInFormError = action.payload;
    },
    setSignUpFormSubmittingStatus: (state, action) => {
      state.signUpFormSubmittingStatus = action.payload;
    },
    setSignUpFormError: (state, action) => {
      state.signUpFormError = action.payload;
    },
  },
});

export const {
  setTokenPair,
  setSignInFormSubmittingStatus,
  setSignInFormError,
  setSignUpFormSubmittingStatus,
  setSignUpFormError,
} = authSlice.actions;

export default authSlice.reducer;
