import api from '@/common/utils/axiosInstance';
import Router from 'next/router';
import LoginDto from '../types/LoginDto';
import RegisterDto from '../types/RegisterDto';

export const register = (dto: RegisterDto) => {
  api
    .post('/api/auth/register/', dto)
    .then((res) => {
      console.log(res);
      Router.replace('/example');
    })
    .catch((err) => console.log(err));
};

export const login = (dto: LoginDto) => {
  api.post('/api/auth/login/', dto).then((res) => {
    console.log(res);
    Router.replace('/example');
    localStorage.setItem('jwt', res.data.access_token);
  });
};

export const logout = () => {
  api.post('/api/auth/logout/').then(() => {
    Router.replace('/');
    localStorage.removeItem('jwt');
  });
};

export const isLoggedIn = () => {
  return typeof window !== 'undefined' && !!localStorage.getItem('jwt');
};
