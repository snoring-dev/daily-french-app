import axios from "axios";
import { getJWT } from "./auth";

const api = axios.create({
  baseURL: "https://daily-french.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(async (config) => {
  const jwt = await getJWT();
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("API Error:", {
        status: error.response.status,
        statusText: error.response.statusText,
        url: error.config?.url,
        method: error.config?.method,
        data: error.response.data,
        headers: error.config?.headers,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API Request Error:", {
        message: error.message,
        url: error.config?.url,
        method: error.config?.method,
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("API Setup Error:", {
        message: error.message,
        config: error.config,
      });
    }

    return Promise.reject(error);
  }
);

export default api;
