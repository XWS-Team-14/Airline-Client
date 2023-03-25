import Button from '@/common/components/button/Button';
import api from '@/common/utils/axiosInstance';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Select } from 'antd';

import Link from 'next/link';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addFlight } from '../services/flight.service';
import styles from '../styles/AllFlights.module.scss';
import FlightDto from '../types/FlightDto';
import {ArrowRightOutlined } from "@ant-design/icons";
const AddFlight = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [Routes, setRoutes] = useState<any[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
    useEffect (() =>  {
    api
    .get('api/route/all/places/')
    .then((res) =>{
        setRoutes(Array.from(res.data.results));
    })}, [])
  const onFinish = (values: FlightDto) => {
    addFlight({
      id: 's',
      route: selectedRoute,
      date_of_departure: values.date_of_departure,
      ticket_price: values.ticket_price,
      number_of_seats: values.number_of_seats,
      number_of_free_spaces: values.number_of_seats,
    })
      .then((res) => {
        router.replace('/allFlights');
      })
    };

  return (
    <section className={styles.pageWrapper}>
      <ToastContainer />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Add Flight</h1>
        <Form
          form={form}
          className={styles.flightForm}
          onFinish={onFinish}
        >
          <Form.Item
            name="Route"
            rules={[
              { required: true, message: selectedRoute }
              
            ]}
          >
            
            <Select
                value = {selectedRoute}
                onChange = {(e)=> setSelectedRoute(e.target)}
            >
            {Routes.map((route) =>
            <option value={route.id} key={route.id}>{route.start_point.country}: {route.start_point.airport_city} <ArrowRightOutlined/> {route.end_point.country}: {route.end_point.airport_city}</option>)}
            </Select>
          </Form.Item>
          <Form.Item
            name="date_of_departure"
            rules={[{ required: true, message: 'Date of departure is required.' }]}
          >
            <Input
              className={styles.input}
              type="date"
              placeholder="dd/MM/yyyy"
            />
          </Form.Item>
          <Form.Item
            name="ticket_price"
            rules={[
              { required: true, message: 'ticket price is required.' },
                
            ]}
          >
            <Input
                type = "number"
              className={styles.input}
              placeholder="ticket price"
            />
          </Form.Item>
          <Form.Item
            name="number_of_seats"
            rules={[
              { required: true, message: 'number of seats is required.' }
              
            ]}
          >
            <Input
              type = "number"
              className={styles.input}
              placeholder="number of seats"
            />
            </Form.Item>
          <Form.Item className={styles.submit}>
            <Button type="primary" text="Add Flight" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default AddFlight;
