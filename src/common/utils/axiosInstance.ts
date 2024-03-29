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
  baseURL: 'http://localhost:8000/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;
    let retValue;
    if (
      (response?.status === 401 && !originalRequest.url?.includes('auth')) ||
      response?.detail?.code === 'token_not_valid'
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        await refresh()
          .then(async (res) => {
            isRefreshing = false;
            const setHeaders = async () => {
              api.defaults.headers.common.Authorization =
                'Bearer ' + res.data.access;
              originalRequest.headers.Authorization =
                'Bearer ' + res.data.access;
            };
            return await setHeaders().then(async () => {
              retValue = Promise.resolve(api(originalRequest));
            });
          })
          .catch((err) => {
            store.dispatch(setAuthState(false));
            store.dispatch(setUserEmail(null));
            store.dispatch(setUserFirstName(null));
            store.dispatch(setUserLastName(null));
          });

        return retValue;
      }
    } else if (response?.status === 403) {
      Router.replace('/');
      return Promise.reject(error);
    } else if (!Router.pathname.includes('login')) {
      Router.replace('/');
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
