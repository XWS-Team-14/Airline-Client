import { SearchFlightsDto } from './SearchFlightsDto';

export interface SearchResultDto {
  next: string;
  previous: string;
  results: SearchFlightsDto[];
}
