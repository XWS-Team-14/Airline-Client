import Route from "./Route";

export default interface Flight {
    id:String;
    date_of_departure:Date;
    ticket_price:Number;
    number_of_seats:Number;
    number_of_free_spaces:Number;
    route:Route;
}   