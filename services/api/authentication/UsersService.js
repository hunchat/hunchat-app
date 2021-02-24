import axios from "axios";
import axiosInstance from "../../axios.js";

class UsersService {
  constructor() {}

  list() {
    const url = `${process.env.REACT_NATIVE_HUNCHAT_API_URL}/api/users/`;
    return axios.get(url);
  }

  get(userId) {
    const url = `${process.env.REACT_NATIVE_HUNCHAT_API_URL}/api/users/${userId}/`;
    return axios.get(url);
  }

  create(formData) {
    const url = `${process.env.REACT_NATIVE_HUNCHAT_API_URL}/api/users/`;
    return axios.post(url, formData);
  }

  partialUpdate(userId, data) {
    const url = `/api/users/${userId}/`;
    return axiosInstance.patch(url, data);
  }

  bioVideoUpdate(userId, data) {
    var formData = new FormData();
    formData.append("file", data.bio_video.file);
    formData.append("duration", data.bio_video.duration);
    formData.append("height", data.bio_video.height);
    formData.append("width", data.bio_video.width);
    const url = `/api/users/${userId}/bio_video/`;
    return axiosInstance.put(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  imageUpdate(userId, data) {
    var formData = new FormData();
    formData.append("file", data.image.file);
    const url = `/api/users/${userId}/image/`;
    return axiosInstance.put(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  delete(userId) {
    const url = `/api/users/${userId}/`;
    return axiosInstance.delete(url);
  }
}

module.exports = UsersService;
