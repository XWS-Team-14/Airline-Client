import * as React from 'react';
import { Component,useEffect,useState  } from 'react';
import FlightDto from '../types/FlightDto';
import   styles  from '../styles/AllFlights.module.scss';
import api from '@/common/utils/axiosInstance';


let dataIsLoaded : boolean = false;


  const  AllFlights = () =>{
    const [Flights, setFlights] = useState<FlightDto[]>([]);
    useEffect (() =>  {
    api
    .get('/api/flight/all')
    .then((res) =>{
        setFlights(Array.from(res.data.results));
    })}, [])
  
    return (<section className={styles.pageWrapper}>
        <div className={styles.wrapper}>
          {Flights.map((flight) =>
          <button className={styles.flightCard} key={flight.id}>
          <div className={styles.flightCardContent}>From: {flight.route.start_point.country} {flight.route.start_point.airport_city} 
           To: {flight.route.end_point.country} {flight.route.end_point.airport_city}
          | Departure date: {flight.date_of_departure}
          | Ticket price : {flight.ticket_price} | Free seats: {flight.number_of_free_spaces}/{flight.number_of_seats}</div>
         </button>)
         }  
        </div>
      </section>);
      
  };

  export default AllFlights;