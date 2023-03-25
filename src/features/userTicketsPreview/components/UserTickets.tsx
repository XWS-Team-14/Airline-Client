import api from '@/common/utils/axiosInstance';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { getUserData } from '../services/tickets.service';
import UserDetails from '../types/UserDetails';
//import styles from '../styles/auth.module.scss';

const FetchUserTickets = () =>{
  const [data , setData] = useState<UserDetails>();
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getUserData("tarmiric@gmail.com");
          setData(response);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);
  return (
      <section>
        <ToastContainer />
        
          <div>
          <h1>{data?.first_name +" "+data?.last_name}</h1>
          <p>{data?.email}</p>
          <p>{data?.date_joined.toString()}</p>
          <p>{data?.last_login.toString()}</p>
          <div>
              {data?.tickets.map(item => (
                  <div key={item.id}>
                  <h2>{item.flight.date_of_departure.toString()}</h2>
                  <p>{item.flight.ticket_price.toString()}</p>
                  <p>{item.flight.route.start_point.country+" - "+item.flight.route.start_point.airport_city+" - "+item.flight.route.start_point.airport_name}</p>
                  <p>{item.flight.route.end_point.country+" - "+item.flight.route.end_point.airport_city+" - "+item.flight.route.end_point.airport_name}</p>
                  </div>
              ))}
              </div>
          </div>
          
      </section>
  )
}

export default FetchUserTickets;
