import { selectEmail } from '@/common/store/slices/authSlice';
import { UserDetails } from '@/common/types/User';
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from '../services/tickets.service';
import styles from '../styles/tickets.module.scss';

const Tickets = () => {
  const userEmail = useSelector(selectEmail);
  const [data, setData] = useState<UserDetails>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userEmail !== 'err') {
          const response = await getUserData(userEmail);
          setData(response);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userEmail]);
  return (
    <section>
      <div className={styles.wrapper}>
        <div className={styles.cardHolder}>
          {data?.tickets.map((item) => (
            <Card key={item.id} bordered={true} className={styles.card}>
              <p>
                <strong>Date:</strong>
                {item.flight.date_of_departure.toString()}
              </p>
              <p>
                <strong>Price:</strong>
                {item.flight.ticket_price.toString()}
              </p>
              <p>
                <strong>From:</strong>
                {item.flight.route.start_point.country +
                  ' - ' +
                  item.flight.route.start_point.airport_city +
                  ' - ' +
                  item.flight.route.start_point.airport_name}
              </p>
              <p>
                <strong>To:</strong>
                {item.flight.route.end_point.country +
                  ' - ' +
                  item.flight.route.end_point.airport_city +
                  ' - ' +
                  item.flight.route.end_point.airport_name}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tickets;
