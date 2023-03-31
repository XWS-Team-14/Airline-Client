/* eslint-disable camelcase */
import Button from '@/common/components/button/Button';
import Route from '@/common/types/Route';
import api from '@/common/utils/axiosInstance';
import { ArrowRightOutlined } from '@ant-design/icons';
import { DatePicker, Form, InputNumber, Select } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addFlight } from '../services/flight.service';
import styles from '../styles/flights.module.scss';

const AddFlight = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route>(null);

  useEffect(() => {
    api.get('api/route/all/places/').then((res) => {
      setRoutes(Array.from(res.data.results));
    });
  }, []);

  const onFinish = async (values: any) => {
    await addFlight({
      route: selectedRoute,
      date_of_departure: dayjs(values.date_of_departure).format(
        'YYYY-MM-DD HH:mm'
      ),
      ticket_price: values.ticket_price,
      number_of_seats: values.number_of_seats,
      number_of_free_spaces: values.number_of_seats,
      id: '',
    })
      .then((res) => {
        router.push('/flights');
      })
      .catch((err) => {
        console.error(err);
        err.response.data.non_field_errors.map((error: string) => {
          toast.error(error);
        });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    errorInfo.errorFields.map((error: any) => {
      toast.error(error.errors[0]);
    });
  };

  return (
    <section className={styles.pageWrapper}>
      <ToastContainer />
      <div className={styles.wrapper}>
        <Form
          form={form}
          className={classNames(styles.flightForm, 'frostedGlass')}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <h1 className={styles.title}>New flight</h1>
          <Form.Item
            name="Route"
            rules={[{ required: true, message: 'Route is required.' }]}
          >
            <Select
              allowClear
              placeholder="Route"
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
              {
                required: true,
                message: 'Date and time of departure is required.',
              },
            ]}
            style={{ width: '100%' }}
          >
            <DatePicker
              allowClear
              placeholder="Date and time of departure"
              showTime
              showNow={true}
              showToday={true}
              disabledDate={(current) =>
                current && current.valueOf() < Date.now()
              }
              format="MMMM DD, YYYY, HH:mm"
              style={{ width: '100%' }}
            ></DatePicker>
          </Form.Item>
          <Form.Item
            name="ticket_price"
            rules={[{ required: true, message: 'Ticket price is required.' }]}
          >
            <InputNumber
              className={styles.input}
              placeholder="Price"
              prefix="€"
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item
            name="number_of_seats"
            rules={[
              { required: true, message: 'Number of seats is required.' },
            ]}
          >
            <InputNumber
              className={styles.input}
              placeholder="Capacity"
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item className={styles.submit}>
            <Button
              type="primary"
              text="Add"
              style={{ width: '100%', fontSize: '14px' }}
            />
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default AddFlight;
