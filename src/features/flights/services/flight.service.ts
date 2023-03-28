import api from '@/common/utils/axiosInstance';
import Router from 'next/router';
import FlightDto from '../types/FlightDto';

export const addFlight = async (dto: FlightDto) => {
  return await api.post('/api/flight/', dto);
};
export const deleteFlight = async (dto: FlightDto) => {
  return await api.delete('/api/flight/delete/' + dto.id + '/', { data: dto });
};
