import { refresh } from '@/features/auth/services/auth.service';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
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
const errorHandler = (error: any) => {
  const statusCode = error.response?.status;

  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});

export default api;

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError<ErrorResponse>): Promise<any> => {
  if (error.response) {
    console.log(error);
    if (
      error.response.status === 401 &&
      error.response.data.code &&
      error.response.data.code === 'token_not_valid'
    ) {
      try {
        refresh().then(
          (res) =>
            (api.defaults.headers.common.Authorization =
              'Bearer ' + res.data.access)
        );
        return Promise.resolve();
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
  }
  return Promise.reject(error);
};

const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};

setupInterceptorsTo(api);
