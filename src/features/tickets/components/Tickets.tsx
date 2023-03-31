import Loading from '@/common/components/loading/Loading';
import { selectEmail } from '@/common/store/slices/authSlice';
import { UserDetails } from '@/common/types/User';
import FlightInfo from '@/features/flights/components/FlightInfo';
import { List } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { getUserData } from '../services/tickets.service';
import styles from '../styles/tickets.module.scss';

const Tickets = () => {
  const userEmail = useSelector(selectEmail);
  const [data, setData] = useState<UserDetails>();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userEmail !== 'err') {
          const response = await getUserData(userEmail);
          setData(response);
          setFetched(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userEmail]);

  return fetched ? (
    <div className={styles.wrapper}>
      <ToastContainer />
      <List
        dataSource={data?.tickets}
        renderItem={(item) => (
          <>
            <FlightInfo item={item.flight} page="Ticket" />
          </>
        )}
      />
    </div>
  ) : (
    <Loading />
  );
};

export default Tickets;
