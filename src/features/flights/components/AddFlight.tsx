import Button from '@/common/components/button/Button';
import api from '@/common/utils/axiosInstance';
import { Form, Input, Select } from 'antd';

import { ArrowRightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addFlight } from '../services/flight.service';
import styles from '../styles/flights.module.scss';
const AddFlight = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [routes, setRoutes] = useState<any[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  useEffect(() => {
    api.get('api/route/all/places/').then((res) => {
      setRoutes(Array.from(res.data.results));
    });
  }, []);
  const onFinish = (values: any) => {
    values.date_of_departure;
    addFlight({
      route: selectedRoute,
      date_of_departure:
        values.date_of_departure + 'T' + values.time_of_departure + ':00Z',
      ticket_price: values.ticket_price,
      number_of_seats: values.number_of_seats,
      number_of_free_spaces: values.number_of_seats,
      id: '',
    }).then((res) => {
      router.replace('/allFlights');
    });
  };

  return (
    <section className={styles.pageWrapper}>
      <ToastContainer />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Add a new flight</h1>
        <Form form={form} className={styles.flightForm} onFinish={onFinish}>
          <Form.Item
            name="Route"
            rules={[{ required: true, message: selectedRoute }]}
          >
            <Select
              className={styles.input}
              value={selectedRoute}
              onChange={(value) => {
                setSelectedRoute(value);
              }}
            >
              {routes.map((route) => (
                <Select.Option value={route.id} key={route.id}>
                  {route.start_point.country}: {route.start_point.airport_city}{' '}
                  <ArrowRightOutlined /> {route.end_point.country}:{' '}
                  {route.end_point.airport_city}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="date_of_departure"
            rules={[
              { required: true, message: 'Date of departure is required.' },
            ]}
          >
            <Input
              className={styles.input}
              type="date"
              placeholder="Date of departure"
            />
          </Form.Item>
          <Form.Item
            name="time_of_departure"
            rules={[
              { required: true, message: 'Time of departure is required.' },
            ]}
          >
            <Input
              className={styles.input}
              type="time"
              placeholder="Time of departure"
            />
          </Form.Item>
          <Form.Item
            name="ticket_price"
            rules={[{ required: true, message: 'Ticket price is required.' }]}
          >
            <Input
              type="number"
              className={styles.input}
              placeholder="Price"
              prefix="€"
            />
          </Form.Item>
          <Form.Item
            name="number_of_seats"
            rules={[
              { required: true, message: 'Number of seats is required.' },
            ]}
          >
            <Input
              type="number"
              className={styles.input}
              placeholder="Capacity"
            />
          </Form.Item>
          <Form.Item className={styles.submit}>
            <Button type="primary" text="Add" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default AddFlight;
