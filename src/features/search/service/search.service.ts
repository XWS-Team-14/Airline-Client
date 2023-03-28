import api from '@/common/utils/axiosInstance';
import PlaceDto from '../types/PlaceDto';
import { SearchParams } from '../types/SearchParams';
import { SelectOptions } from '../types/SelectOptions';


export async function fetchPlaces(): Promise<SelectOptions[]> {
    return api
        .get('/api/place/all')
        .then((res) => {
            return (res.data.results.map(
                (place: PlaceDto) => ({
                    label: `${place.country}, ${place.airport_city}, ${place.airport_name}`,
                    value: place.id,
                })
            ));
        })
        .catch((err) => console.log(err));

}

export async function fetchData(searchParams: SearchParams | undefined): Promise<void> {
    return api
        .get('/api/search/?date='+printValues(searchParams?.date)+'&start_point='+printValues(searchParams?.start_point)+'&end_point='+printValues(searchParams?.end_point)+'&space_needed='+printValues(searchParams?.number_of_tickets))
        .then((res) =>
        console.log(res.data)
        )
        .catch((err) => console.log(err));

}

function printValues(val : any) {
    return val == undefined ? '' : val
  }
