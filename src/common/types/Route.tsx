import Place from './Place';

export default interface Route {
  id: string;
  start_point: Place;
  end_point: Place;
}
