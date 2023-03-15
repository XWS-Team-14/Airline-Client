import api from '@/common/utils/axiosInstance';
import Router from 'next/router';

interface RegisterDto {
  first_name: string;
  last_name: string;
  email: string;
  password1: string;
  password2: string;
}
export const register = (dto: RegisterDto) => {
  api
    .post('/api/auth/register/', dto)
    .then((res) => {
      console.log(res);
      Router.replace('/example');
    })
    .catch((err) => console.log(err));
};
