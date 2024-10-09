/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  async (config) => {
    if (typeof window !== 'undefined') {
      const accessToken =
        sessionStorage.getItem('@token:access') ||
        localStorage.getItem('@token:access');
      if (
        accessToken &&
        !config.url?.includes('auth/local') &&
        !config.url?.includes('auth/reset-password')
      ) {
        config.headers!.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;

      if (window) {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = '/';
      }

      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);
