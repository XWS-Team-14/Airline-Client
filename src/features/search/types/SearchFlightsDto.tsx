import Flight from '@/common/types/Flight';

export interface SearchFlightsDto extends Flight {
  collective_price?: number;
  status?: boolean;
}
