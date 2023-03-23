import api from '@/common/utils/axiosInstance';
import Router from 'next/router';
import FlightDto from '../types/FlightDto';

export const addFlight = async (dto: FlightDto) => {
    return await api.post('/api/flight/', dto);
  };