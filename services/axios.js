import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { store } from "../store";
import { setTokenPair } from "../ducks/authSlice";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_NATIVE_HUNCHAT_API_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  async (config) => {

    const state = store.getState();

    config.headers = {
      Authorization: state.auth.accessToken
        ? "JWT " + state.auth.accessToken
        : null,
      "Content-Type": "application/json",
      accept: "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401
    ) {

      const state = store.getState();

      if (state.auth.refreshToken) {
        const tokenParts = JSON.parse(
          atob(state.auth.refreshToken.split(".")[1])
        );

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post("api/auth/token/refresh/", {
              refresh: state.auth.refreshToken,
            })
            .then((response) => {
              const authData = {
                accessToken: response.data.access,
                refreshToken: response.data.refresh,
              };

              // Refresh tokens in store
              store.dispatch(
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

              axiosInstance.defaults.headers["Authorization"] =
                "JWT " + response.data.access;
              originalRequest.headers["Authorization"] =
                "JWT " + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((error) => {
              // Handle Error
            });
        }
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;
