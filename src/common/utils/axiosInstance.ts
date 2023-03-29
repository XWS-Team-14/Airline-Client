import { refresh } from '@/features/auth/services/auth.service';
import axios from 'axios';
import Router from 'next/router';
import {
  setAuthState,
  setUserEmail,
  setUserFirstName,
  setUserLastName,
} from '../store/slices/authSlice';
import { store } from '../store/store';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
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
        refresh()
          .then((res) => {
            isRefreshing = false;
            const setHeaders = async () => {
              api.defaults.headers.common.Authorization =
                'Bearer ' + res.data.access;
              originalRequest.headers.Authorization =
                'Bearer ' + res.data.access;
            };
            return setHeaders().then(async () => {
              const retry = await new Promise((resolve, reject) => {
                resolve(api(originalRequest));
              });
              return retry;
            });
          })
          .catch((err) => {
            store.dispatch(setAuthState(false));
            store.dispatch(setUserEmail(null));
            store.dispatch(setUserFirstName(null));
            store.dispatch(setUserLastName(null));
          });
      }
      return Promise.resolve();
    } else if (status === 403) {
      Router.replace('/');
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
