import Route from '@/common/types/Route';

export interface SearchFlightsDto {
  collective_price: number;
  date_of_departure: Date;
  id: string;
  number_of_free_spaces: number;
  number_of_seats: number;
  route: Route;
  status: boolean;
  ticket_price: number;
}
