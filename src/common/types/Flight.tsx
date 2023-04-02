import Route from './Route';

export default interface Flight {
  id: string;
  date_of_departure: Date | string;
  ticket_price: number;
  number_of_seats: number;
  number_of_free_spaces: number;
  route: Route;
}
