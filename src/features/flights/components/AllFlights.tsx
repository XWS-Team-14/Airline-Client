import api from '@/common/utils/axiosInstance';
import {
  ArrowRightOutlined,
  ClockCircleOutlined,
  CompassOutlined,
  EuroCircleOutlined,
} from '@ant-design/icons';
import { Button, Divider, Modal } from 'antd';
import Moment from 'moment';
import { useEffect, useState } from 'react';
import { deleteFlight } from '../services/flight.service';
import styles from '../styles/flights.module.scss';
import FlightDto from '../types/FlightDto';

const AllFlights = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (dto: FlightDto) => {
    deleteFlight(dto).then(() => {
      api.get('/api/flight/all').then((res) => {
        setFlights(Array.from(res.data.results));
      });
      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [flights, setFlights] = useState<FlightDto[]>([]);
  useEffect(() => {
    api.get('/api/flight/all').then((res) => {
      setFlights(Array.from(res.data.results));
    });
  }, []);

  return (
    <section className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Flights</h1>
        {flights.map((flight) => (
          <div className={styles.flightCard} key={flight.id}>
            <div className={styles.flightCardContent}>
              <CompassOutlined /> {flight.route.start_point.country}:{' '}
              {flight.route.start_point.airport_city} <ArrowRightOutlined />{' '}
              {flight.route.end_point.country}:{' '}
              {flight.route.end_point.airport_city}
              <Divider type="vertical" /> <ClockCircleOutlined /> :{' '}
              {Moment(flight.date_of_departure).format('DD.MM.yyyy HH:mm')}
              <Divider type="vertical" /> <EuroCircleOutlined /> :{' '}
              {flight.ticket_price} <Divider type="vertical" /> Free seats:{' '}
              {flight.number_of_free_spaces}/{flight.number_of_seats}
              <Divider type="vertical" />
              <Button
                type="primary"
                danger
                className={styles.cancelButton}
                onClick={() => showModal()}
              >
                Cancel
              </Button>
              <Modal
                title="Cancel flight"
                okText="Yes"
                cancelText="No"
                okButtonProps={{ danger: true }}
                open={isModalOpen}
                onOk={() => handleOk(flight)}
                onCancel={handleCancel}
              >
                <p>Are you sure you want to cancel this flight?</p>
              </Modal>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllFlights;