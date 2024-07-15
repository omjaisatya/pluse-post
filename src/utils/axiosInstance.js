import axios from "axios";

const API = import.meta.env.VITE_POST_API;
const axiosInstance = axios.create({
  baseURL: API,
});

axiosInstance.interceptors.request.use((req) => {
  const stringifyBlogData = window.localStorage.getItem("blogData");

  if (stringifyBlogData) {
    const blogData = JSON.parse(stringifyBlogData);
    const token = blogData.token;

    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default axiosInstance;
