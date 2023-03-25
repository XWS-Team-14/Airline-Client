import Place from "./Place";

export default interface Route {
    id:String;
    start_point:Place;
    end_point:Place;
}