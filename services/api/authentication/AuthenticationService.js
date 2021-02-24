import axios from "axios";
import axiosInstance from "../../axios.js";

class AuthenticationService {
  constructor() {}

  usernameAvailable(data) {
    const url = `${process.env.REACT_NATIVE_HUNCHAT_API_URL}/api/auth/username_available/`;
    return axios.post(url, data).then((response) => response);
  }

  emailAvailable(data) {
    const url = `${process.env.REACT_NATIVE_HUNCHAT_API_URL}/api/auth/email_available/`;
    return axios.post(url, data).then((response) => response);
  }

  tokenObtain(data) {
    const url = `${process.env.REACT_NATIVE_HUNCHAT_API_URL}/api/auth/token/obtain/`;
    return axios.post(url, data).then((response) => response);
  }

  tokenRefresh(refreshToken) {
    axios
      .post("api/auth/token/refresh/", { refresh: refreshToken })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  tokenCheck(refreshTokenJti) {
    const url = `${process.env.REACT_NATIVE_HUNCHAT_API_URL}/api/auth/token/check/`;
    return axiosInstance
      .post(url, { jti: refreshTokenJti })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  tokenBlacklist(refreshToken) {
    return axiosInstance
      .post("/api/auth/token/blacklist/", {
        refresh_token: refreshToken,
      })
      .then((response) => {
        return response;
      });
  }
}

module.exports = AuthenticationService;
