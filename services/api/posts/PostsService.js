import axios from "axios";
import axiosInstance from "../../axios.js";

class PostsService {
  constructor() {}

  list() {
    const url = `${process.env.REACT_NATIVE_HUNCHAT_API_URL}/api/posts/`;
    return axios.get(url);
  }

  get(postId) {
    const url = `${process.env.REACT_NATIVE_HUNCHAT_API_URL}/api/posts/${postId}/`;
    return axios.get(url);
  }

  create(data) {
    var formData = new FormData();
    formData.append("file", data.video.file);
    formData.append("duration", data.video.duration);
    formData.append("height", data.video.height);
    formData.append("width", data.video.width);

    formData.append("description", data.description);
    if (data.commentTo) {
      formData.append("comment_to", data.commentTo);
    }

    const url = `/api/posts_create/`;
    return axiosInstance.put(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  like(postId) {
    return axiosInstance.post(`/api/posts/${postId}/like`);
  }

  getThread(postId) {
    const url = `${process.env.REACT_NATIVE_HUNCHAT_API_URL}/api/posts/${postId}/thread`;
    return axios.get(url);
  }
}

module.exports = PostsService;
