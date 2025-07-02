import axios, {AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { getToken, logout } from "./auth";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }
  );

  api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default api;
