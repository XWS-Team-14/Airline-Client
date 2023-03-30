import Button from '@/common/components/button/Button';
import Loading from '@/common/components/loading/Loading';
import { selectEmail } from '@/common/store/slices/authSlice';
import FlightInfo from '@/features/flights/components/FlightInfo';
import * as ticketService from '@/features/tickets/services/tickets.service';
import PurchaseDto from '@/features/tickets/types/PurchaseDto';
import { Button as AntButton, Layout, List, Modal, Space } from 'antd';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchData, fetchDataPage } from '../service/search.service';
import styles from '../styles/search.module.scss';
import { SearchFlightsDto } from '../types/SearchFlightsDto';
import { SearchParams } from '../types/SearchParams';
interface SearchDataProps {
  searchParams: SearchParams | undefined;
}

const SearchData = ({ searchParams }: SearchDataProps) => {
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  const [flights, setFlights] = useState<SearchFlightsDto[]>([]);
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');
  const [purchaseFeedbackText, setPurchaseFeedbackText] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [fetched, setFetched] = useState(false);
  const userEmail = useSelector(selectEmail);
  const { Content, Sider } = Layout;

  useEffect(() => {
    fetchData(searchParams).then((data) => {
      setFlights(data.results);
      setNext(data.next);
      setPrevious(data.previous);
      setFetched(true);
    });
  }, [searchParams]);

  function isSoldOut(flight: SearchFlightsDto) {
    return flight.number_of_free_spaces <= 0;
  }
  function buyTickets(id: string, ticketNumber: number) {
    if (userEmail === null) {
      toast.error('You must log in to purchase a ticket.');
      router.replace('/login');
      return;
    }

    if (ticketNumber === 0) {
      toast.error('Please select a ticket to purchase.');
      return;
    }

    let dto: PurchaseDto = {
      flight_id: id,
      user_email: userEmail,
      num_of_tickets: ticketNumber,
    };

    ticketService
      .buyTickets(dto)
      .then((res) => {
        toast.success('Successfully purchased tickets!');
      })
      .catch((err) => {
        toast.error(
          'Unable to purchase tickets due to an error. Please try again later.'
        );
      });
  }

  function changePage(url: string) {
    if (url === null) return;
    fetchDataPage(url).then((data) => {
      setFlights(data.results);
      setNext(data.next);
      setPrevious(data.previous);
    });
  }

  const showModal = () => {
    setOpen(true);
  };

  function handleOk() {
    router.replace('/userTickets');
  }

  return fetched ? (
    <div className={styles.searchBarContainer}>
      <ToastContainer />
      <Space className={styles.centerContainer}>
        <List
          dataSource={flights}
          renderItem={(item) => {
            const ticketCount = item.collective_price
              ? item.collective_price / item.ticket_price
              : 1;
            return (
              <FlightInfo
                item={item}
                page="Search"
                buyAction={() => buyTickets(item.id, ticketCount)}
              />
            );
          }}
        />
        <Space className={styles.centerWrapper}>
          <Button
            type="secondary"
            action={() => changePage(previous)}
            text="< Previous"
            style={{ width: 120 }}
          />
          <Button
            type="secondary"
            action={() => changePage(next)}
            text="Next >"
            style={{ width: 120 }}
          />
        </Space>
      </Space>
      <Modal
        open={open}
        title="Ticket purchase"
        onOk={handleOk}
        footer={[
          <AntButton key="back" onClick={handleOk}>
            Go to tickets
          </AntButton>,
        ]}
      >
        <p>{purchaseFeedbackText}</p>
      </Modal>
    </div>
  ) : (
    <Loading />
  );
};

export default SearchData;
