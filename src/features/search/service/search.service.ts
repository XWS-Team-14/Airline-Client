import Place from '@/common/types/Place';
import api from '@/common/utils/axiosInstance';
import { SearchParams } from '../types/SearchParams';
import { SearchResultDto } from '../types/SearchResultDto';
import { SelectOptions } from '../types/SelectOptions';

export async function fetchPlaces(): Promise<SelectOptions[]> {
  return api
    .get('/api/place/all')
    .then((res) => {
      return res.data.results.map((place: Place) => ({
        label: `${place.country}, ${place.airport_city}, ${place.airport_name}`,
        value: place.id,
      }));
    })
    .catch((err) => console.log(err));
}

export async function fetchData(
  searchParams: SearchParams | undefined
): Promise<SearchResultDto> {
  return api
    .get(
      '/api/search/?date=' +
        printValues(searchParams?.date) +
        '&start_point=' +
        printValues(searchParams?.start_point) +
        '&end_point=' +
        printValues(searchParams?.end_point) +
        '&space_needed=' +
        printValues(searchParams?.number_of_tickets)
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
}

export async function fetchDataPage(url: string): Promise<SearchResultDto> {
  return api
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
}

function printValues(val: any) {
  return val === undefined ? '' : val;
}
