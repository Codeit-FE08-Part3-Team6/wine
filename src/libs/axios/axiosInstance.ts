import { AuthTokens } from "@/types/auth";
import { removeTokens } from "@/utils/authTokenStorage";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const reqConfig = config;
  const accessToken = localStorage.getItem("accessToken");
  reqConfig.headers.Authorization = `bearer ${accessToken}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      localStorage.getItem("refreshToken")
    ) {
      let res: AxiosResponse;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        res = await axiosInstance.post("auth/refresh-token", {
          refreshToken,
        });
      } catch {
        removeTokens();
        return Promise.reject(error);
      }
      const { accessToken }: { accessToken: string } = res.data as AuthTokens;
      localStorage.setItem("accessToken", accessToken);
      return axiosInstance(originalRequest as AxiosRequestConfig);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
