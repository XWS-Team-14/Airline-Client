import * as React from 'react';
import { Component,useEffect,useState  } from 'react';
import FlightDto from '../types/FlightDto';
import   styles  from '../styles/AllFlights.module.scss';
import api from '@/common/utils/axiosInstance';

let Flights : FlightDto[] = [];
  
  const AllFlights = () =>{
    const [flights, setFlights] = useState([])
    useEffect(() =>  {
      api
      .get('/api/flight/all/')
      .then((res: { data: FlightDto[]; }) =>{
          Flights = res.data
        })})
      
    
    return (<section className={styles.pageWrapper}>
        <div className={styles.wrapper}>
          {Flights.map((flight, index) =>
          <button className={styles.flightCard} key={index}>
          <div className={styles.flightCardContent} 
          >Route: {flight.route} | Departure date: {flight.date_of_departure} |
           Ticket price : {flight.ticket_price} | Free seats: {flight.number_of_free_spaces}/{flight.number_of_seats}</div>
         </button>)
         }  
        </div>
      </section>);
      
  };
  export default AllFlights;