import api from '@/common/utils/axiosInstance';
import PurchaseDto from '../types/PurchaseDto';

export const getUserData = (email: string) => {
  return api.get(`/api/user/${email}/`).then((result) => result.data);
};

export const buyTickets = (dto: PurchaseDto) => {
  return api.post('api/ticket/purchase/', dto);
};
