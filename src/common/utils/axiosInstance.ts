import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
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

/*import store from '../../store/store';

const listener = () => {
  const token = store.getState().token;
  api.defaults.headers.common.Authorization = token;
};

store.subscribe(listener);*/

export default api;
