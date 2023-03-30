import PlaceDto from './PlaceDto';

export interface RouteDto {
  start_point: PlaceDto;
  end_point: PlaceDto;
  id: string;
}
