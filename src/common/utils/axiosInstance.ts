import { refresh } from '@/features/auth/services/auth.service';
import axios from 'axios';
import Router from 'next/router';

interface ErrorResponse {
  detail: string;
  code: string;
}
const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [
    (data) => {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    (data) => {
      return JSON.parse(data);
    },
  ],
});
let isRefreshing = false;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (status === 401 && Router.pathname !== '/login') {
      if (!isRefreshing) {
        isRefreshing = true;
        refresh().then((res) => {
          isRefreshing = false;
          api.defaults.headers.common.Authorization =
            'Bearer ' + res.data.access;
        });
      }

      const retryOrigReq = new Promise((resolve, reject) => {
        resolve(axios(originalRequest));
      });
      return retryOrigReq;
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
