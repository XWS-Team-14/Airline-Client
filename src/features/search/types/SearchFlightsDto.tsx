import Flight from '@/common/types/Flight';
import Route from '@/common/types/Route';

export interface SearchFlightsDto extends Flight {
  collective_price?: number;
  status: boolean;
  ticket_price: number;
}
