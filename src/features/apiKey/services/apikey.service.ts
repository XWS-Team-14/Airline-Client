import api from '@/common/utils/axiosInstance';
import KeyCreationDto from '../types/KeyCreationDto';
import UserEmailDto from '../types/UserEmailDto';

export const createKey = async (dto: KeyCreationDto) => {
    return await api.post('/api/users/key/', dto);
};

export const getKey = async (dto: UserEmailDto) => {
  return await api.post('/api/fetch/key/', dto);
};
