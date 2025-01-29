import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  //   baseURL:
  //     process.env.NEXT_PUBLIC_API_BASE_URL || "https://brana-ten.vercel.app/api",
  baseURL: "https://brana-ten.vercel.app/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
