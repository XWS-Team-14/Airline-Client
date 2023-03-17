import api from '@/common/utils/axiosInstance';
import Router from 'next/router';
import LoginDto from '../types/LoginDto';
import RegisterDto from '../types/RegisterDto';

export const register = async (dto: RegisterDto) => {
  return await api.post('/api/auth/register/', dto);
};

export const login = async (dto: LoginDto) => {
  return await api.post('/api/auth/login/', dto);
};

export const logout = () => {
  api.post('/api/auth/logout/').then(() => {
    Router.replace('/');
    localStorage.removeItem('loggedIn');
    api.defaults.headers.common.Authorization = '';
  });
};

export const refresh = async () => {
  return api.post('api/auth/token/refresh/');
};

export const verifyToken = async () => {
  return api.post('api/auth/token/verify/');
};
export const isLoggedIn = () => {
  return typeof window !== 'undefined' && !!localStorage.getItem('loggedIn');
};
