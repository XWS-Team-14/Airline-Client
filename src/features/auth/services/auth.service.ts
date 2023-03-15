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
    localStorage.removeItem('jwt');
  });
};

export const isLoggedIn = () => {
  return typeof window !== 'undefined' && !!localStorage.getItem('jwt');
};
