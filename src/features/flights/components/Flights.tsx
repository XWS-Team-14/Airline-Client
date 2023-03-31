import Button from '@/common/components/button/Button';
import Loading from '@/common/components/loading/Loading';
import { selectUser } from '@/common/store/slices/authSlice';
import Flight from '@/common/types/Flight';
import { List, Modal, Space } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchDataPage } from '../../search/service/search.service';
import { deleteFlight, getFlights } from '../services/flight.service';
import styles from '../styles/flights.module.scss';
import FlightInfo from './FlightInfo';

const Flights = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [fetched, setFetched] = useState(false);
  const [selected, setSelected] = useState<Flight | null>(null);
  const user = useSelector(selectUser);
  const router = useRouter();
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');

  useEffect(() => {
    if (!user.isAdmin) {
      router.push('/');
    }
    getAllFlights();
  }, [user]);

  const getAllFlights = async () => {
    await getFlights()
      .then((res) => {
        setFlights(res.data.results);
        setNext(res.data.next);
        setPrevious(res.data.previous);
        setFetched(true);
      })
      .catch((err) => console.log(err));
  };
  const showModal = (item: Flight) => {
    setIsModalOpen(true);
    setSelected(item);
  };

  const handleOk = async (dto: Flight) => {
    setIsModalOpen(false);
    await deleteFlight(dto)
      .then(async () => {
        toast.success('Successfully cancelled flight.');
        await getAllFlights();
      })
      .catch((err) => {
        toast.error('Unable to cancel flight due to an error.');
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  function changePage(url: string) {
    if (url === null) return;
    fetchDataPage(url).then((data) => {
      setFlights(data.results);
      setNext(data.next);
      setPrevious(data.previous);
    });
  }
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
      <Space className={styles.centerWrapper}>
        {previous && (
          <Button
            type="secondary"
            action={() => changePage(previous)}
            text="< Previous"
            style={{ width: 120 }}
          />
        )}
        {next && (
          <Button
            type="secondary"
            action={() => changePage(next)}
            text="Next >"
            style={{ width: 120 }}
          />
        )}
      </Space>
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
