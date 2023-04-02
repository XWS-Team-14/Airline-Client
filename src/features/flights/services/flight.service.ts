import Flight from '@/common/types/Flight';
import api from '@/common/utils/axiosInstance';

export const addFlight = async (dto: Flight) => {
  return await api.post('/api/flight/', dto);
};

export const deleteFlight = async (dto: Flight) => {
  return await api.delete(`/api/flight/delete/${dto.id}/`, { data: dto });
};

export const getFlights = async () => {
  return await api.get('/api/flight/all');
};
