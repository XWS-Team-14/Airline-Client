import Button from '@/common/components/button/Button';
import Loading from '@/common/components/loading/Loading';
import Flight from '@/common/types/Flight';
import api from '@/common/utils/axiosInstance';
import { List, Modal } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteFlight } from '../services/flight.service';
import styles from '../styles/flights.module.scss';
import FlightInfo from './FlightInfo';

const Flights = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [fetched, setFetched] = useState(false);
  const [selected, setSelected] = useState<Flight | null>(null);

  useEffect(() => {
    api
      .get('/api/flight/all')
      .then((res) => {
        setFlights(Array.from(res.data.results));
        setFetched(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const showModal = (item: Flight) => {
    setIsModalOpen(true);
    setSelected(item);
  };

  const handleOk = (dto: Flight) => {
    deleteFlight(dto).then(() => {
      api
        .get('/api/flight/all')
        .then((res) => {
          setFlights(Array.from(res.data.results));
          toast.success('Successfully cancelled flight.');
        })
        .catch((err) => {
          console.log(err);
          toast.success('Unable to cancel flight due to an error.');
        });
      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return fetched ? (
    <div className={styles.wrapper}>
      <ToastContainer />
      <Link href="/flights/add">
        <Button type="secondary" text="Add a new flight"></Button>
      </Link>
      <List
        dataSource={flights}
        renderItem={(item) => (
          <>
            <FlightInfo
              item={item}
              page="Overview"
              cancelAction={() => showModal(item)}
            />
          </>
        )}
      />
      {selected !== null && (
        <Modal
          title="Cancel flight"
          okText="Yes"
          centered={true}
          cancelText="No"
          okButtonProps={{ danger: true }}
          open={isModalOpen}
          onOk={() => handleOk(selected)}
          onCancel={handleCancel}
        >
          <p>Are you sure you want to cancel this flight?</p>
        </Modal>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default Flights;
