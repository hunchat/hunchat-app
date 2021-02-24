import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";

import { retrieveUserThunk, setCurrentUserId } from "./usersSlice";

export function tokenObtainThunk({ username, password }) {
  return function (dispatch, getState) {
    dispatch(setSignInFormSubmittingStatus("pending"));

    const AuthenticationService = require("../services/api/authentication/AuthenticationService");
    const authenticationService = new AuthenticationService();

    authenticationService
      .tokenObtain({ username: username, password: password })
      .then((response) => {
        if (response.status == 200) {
          const decodedToken = jwt_decode(response.data.refresh);

          const authData = {
            accessToken: response.data.access,
            refreshToken: response.data.refresh,
          };

          // Dispatch auth tokens to store
          dispatch(
            setTokenPair({
              accessToken: authData.accessToken,
              refreshToken: authData.refreshToken,
            })
          );

          // Save auth tokens in device secure storage
          SecureStore.setItemAsync(
            "authentication_data",
            JSON.stringify(authData)
          );

          dispatch(setSignInFormSubmittingStatus("fulfilled"));
          let signinFormError = getState().auth.signinFormError;
          if (signinFormError) {
            // Reset signin form error message
            dispatch(setSignInFormError(null));
          }

          dispatch(setSignInFormSubmittingStatus("fulfilled"));

          // Get user info
          dispatch(retrieveUserThunk(decodedToken.user_hashid));
          // Set current user id
          dispatch(setCurrentUserId(decodedToken.user_hashid));
        }
      })
      .catch((error) => {
        dispatch(setSignInFormSubmittingStatus("rejected"));
        dispatch(setSignInFormError(error.response.data.detail));
      });
  };
}

export function emailAvailableThunk({ email }) {
  return function (dispatch, getState) {
    dispatch(setCreateAccountFormEmailAvailableStatus("pending"));

    const AuthenticationService = require("../services/api/authentication/AuthenticationService");
    const authenticationService = new AuthenticationService();

    authenticationService
      .emailAvailable({ email: email })
      .then((response) => {
        if (response.status == 202) {
          dispatch(setCreateAccountFormEmailAvailableStatus("fulfilled"));
          const { createAccountFormEmailAvailableError } = getState().auth;
          if (createAccountFormEmailAvailableError) {
            dispatch(setCreateAccountFormEmailAvailableError(null));
          }
        }
      })
      .catch((error) => {
        dispatch(setCreateAccountFormEmailAvailableStatus("rejected"));
        dispatch(
          setCreateAccountFormEmailAvailableError(error.response.data.email)
        );
      });
  };
}

export function usernameAvailableThunk({ username }) {
  return function (dispatch, getState) {
    dispatch(setSignUpFormUsernameAvailableStatus("pending"));

    const AuthenticationService = require("../services/api/authentication/AuthenticationService");
    const authenticationService = new AuthenticationService();

    authenticationService
      .usernameAvailable({ username: username })
      .then((response) => {
        if (response.status == 202) {
          dispatch(setSignUpFormUsernameAvailableStatus("fulfilled"));
          const { signUpFormUsernameAvailableError } = getState().auth;
          if (signUpFormUsernameAvailableError) {
            dispatch(setSignUpFormUsernameAvailableError(null));
          }
        }
      })
      .catch((error) => {
        dispatch(setSignUpFormUsernameAvailableStatus("rejected"));
        dispatch(
          setSignUpFormUsernameAvailableError(error.response.data.username)
        );
      });
  };
}

export function userCreateThunk({
  username,
  password,
  areTermsAccepted,
  isNewsletterSubscribed,
}) {
  return function (dispatch, getState) {
    dispatch(setSignUpFormSubmittingStatus("pending"));

    const AuthenticationService = require("../services/api/authentication/AuthenticationService");
    const authenticationService = new AuthenticationService();

    const UsersService = require("../services/api/authentication/UsersService");
    const usersService = new UsersService();

    const { email, name } = getState().auth.accountInfo;

    usersService
      .create({
        email: email,
        name: name,
        username: username,
        password: password,
        are_terms_accepted: areTermsAccepted,
        is_newsletter_subscribed: isNewsletterSubscribed,
      })
      .then((response) => {
        if (response.status === 201) {
          let signUpFormError = getState().auth;
          if (signUpFormError) {
            // Reset signup form error message
            dispatch(setSignUpFormError(null));
          }

          authenticationService
            .tokenObtain({ username: username, password: password })
            .then((response_) => {
              const decodedToken = jwt_decode(response_.data.refresh);

              const authData = {
                accessToken: response_.data.access,
                refreshToken: response_.data.refresh,
              };

              // Dispatch auth tokens to store
              dispatch(
                setTokenPair({
                  accessToken: authData.accessToken,
                  refreshToken: authData.refreshToken,
                })
              );

              // Save auth tokens in device secure storage
              SecureStore.setItemAsync(
                "authentication_data",
                JSON.stringify(authData)
              );

              // Get user info
              dispatch(retrieveUserThunk(decodedToken.user_hashid));
              // Set current user id
              dispatch(setCurrentUserId(decodedToken.user_hashid));

              dispatch(setSignUpFormSubmittingStatus("fulfilled"));
            });
        }
      })
      .catch((error) => {
        if (error.response) {
          dispatch(setSignUpFormSubmittingStatus("rejected"));
        }
      });
  };
}

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
    accountInfo: {
      email: null,
      name: null,
    },
    createAccountFormEmailAvailableStatus: "inactive", // 'inactive' || 'pending' || 'fulfilled' || 'rejected'
    createAccountFormEmailAvailableError: null,
    signUpFormSubmittingStatus: "inactive", // 'inactive' || 'pending' || 'fulfilled' || 'rejected'
    signUpFormError: null,
    signUpFormUsernameAvailableStatus: "inactive", // 'inactive' || 'pending' || 'fulfilled' || 'rejected'
    signUpFormUsernameAvailableError: null,
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
    setAccountInfo: (state, action) => {
      state.accountInfo.email = action.payload.email;
      state.accountInfo.name = action.payload.name;
    },
    setCreateAccountFormEmailAvailableStatus: (state, action) => {
      state.createAccountFormEmailAvailableStatus = action.payload;
    },
    setCreateAccountFormEmailAvailableError: (state, action) => {
      state.createAccountFormEmailAvailableError = action.payload;
    },
    setSignUpFormSubmittingStatus: (state, action) => {
      state.signUpFormSubmittingStatus = action.payload;
    },
    setSignUpFormError: (state, action) => {
      state.signUpFormError = action.payload;
    },
    setSignUpFormUsernameAvailableStatus: (state, action) => {
      state.signUpFormUsernameAvailableStatus = action.payload;
    },
    setSignUpFormUsernameAvailableError: (state, action) => {
      state.signUpFormUsernameAvailableError = action.payload;
    },
  },
});

export const {
  setTokenPair,
  setSignInFormSubmittingStatus,
  setSignInFormError,
  setAccountInfo,
  setCreateAccountFormEmailAvailableStatus,
  setCreateAccountFormEmailAvailableError,
  setSignUpFormSubmittingStatus,
  setSignUpFormError,
  setSignUpFormUsernameAvailableStatus,
  setSignUpFormUsernameAvailableError,
} = authSlice.actions;

export default authSlice.reducer;
