import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse, AxiosError } from "axios";

interface AxiosRequestConfig extends InternalAxiosRequestConfig {
  sent?: boolean;
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}` || "http://localhost:3000/api",
  withCredentials: true,
});

let accessToken = "";

export function setAccessToken(newToken: string): void {
  accessToken = newToken;
}

// отправляем запрос и проверяем наличие заголовков авторизации и токена в загловке
axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  if (accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const prevRequest: AxiosRequestConfig = error.config as AxiosRequestConfig;
    if (error.response?.status === 401 && !prevRequest.sent) {
      const response = await axiosInstance("/api/auth/refreshTokens");
      accessToken = response.data.data.accessToken;
      prevRequest.sent = true;
      prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;