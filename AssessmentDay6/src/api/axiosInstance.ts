import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a correlation ID to every request
axiosInstance.interceptors.request.use((config) => {
  config.headers["X-Correlation-ID"] = Math.random()
    .toString(36)
    .substring(2, 15);
  return config;
});

export default axiosInstance;
