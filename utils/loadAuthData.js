import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";

import { setTokenPair } from "../ducks/authSlice";
import { retrieveUserThunk, setCurrentUserId } from "../ducks/usersSlice";

import { store } from "../store";

/**
 * Load authentication data.
 * @function loadAuthData
 */
export default async function loadAuthData() {
  // Retrieve authentication data from device secure store
  const authData = await SecureStore.getItemAsync("authentication_data");

  if (authData !== null) {
    // If there is authentication data on this device
    const authDataJson = JSON.parse(authData);
    const refreshTokenParts = JSON.parse(
      atob(authDataJson.refreshToken.split(".")[1])
    );

    // Dispatch action creator to save auth token in store
    store.dispatch(
      setTokenPair({
        accessToken: authDataJson.accessToken,
        refreshToken: null,
      })
    );

    const AuthenticationService = require("../services/api/authentication/AuthenticationService");
    const authenticationService = new AuthenticationService();

    // Check if token is blacklisted
    authenticationService.tokenCheck(refreshTokenParts.jti).then((response) => {
      if (response.data.message === "Refresh token is not blacklisted") {
        // Refresh token is not blacklisted

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (refreshTokenParts.exp > now) {
          // If refresh token is still valid (hasn't expired)
          if (refreshTokenParts.exp - now < 864000) {
            // If refresh token expires in less than 10 days

            // Refresh token pair
            authenticationService
              .tokenRefresh(authDataJson.refreshToken)
              .then((response) => {
                const newAuthData = {
                  accessToken: response.data.access,
                  refreshToken: response.data.refresh,
                };

                // Dispatch action creator to set tokens in store
                store.dispatch(
                  setTokenPair({
                    accessToken: newAuthData.accessToken,
                    refreshToken: newAuthData.refreshToken,
                  })
                );

                // Save auth tokens in device secure storage
                SecureStore.setItemAsync(
                  "authentication_data",
                  JSON.stringify(newAuthData)
                );

                const decodedToken = jwt_decode(response.data.refresh); // decode token
                // Get user info
                store.dispatch(retrieveUserThunk(decodedToken.user_hashid));
                // Set current user id
                store.dispatch(setCurrentUserId(decodedToken.user_hashid));
              })
              .catch((error) => {
                // Refresh token was invalid?
                // Clean authentication data in device secure store
                SecureStore.deleteItemAsync("authentication_data");
              });
          } else {
            // If refresh token is valid and expires in more than 10 days

            // Dispatch action creator to save auth token in store
            store.dispatch(
              setTokenPair({
                accessToken: authDataJson.accessToken,
                refreshToken: authDataJson.refreshToken,
              })
            );

            const decodedToken = jwt_decode(authDataJson.refreshToken); // decode token
            // Get user info
            store.dispatch(retrieveUserThunk(decodedToken.user_hashid));
            // Set current user id
            store.dispatch(setCurrentUserId(decodedToken.user_hashid));
          }
        }
      } else if (response.data.message === "Refresh token is blacklisted") {
        // Refresh token is blacklisted
        // Clean authentication data in device secure store
        SecureStore.deleteItemAsync("authentication_data");
      }
    });
  }
}
