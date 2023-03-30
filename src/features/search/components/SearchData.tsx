import Airplane from '@/assets/svg/airplane.svg';
import Arrow from '@/assets/svg/arrow.svg';
import Button from '@/common/components/button/Button';
import { selectEmail } from '@/common/store/slices/authSlice';
import * as ticketService from '@/features/tickets/services/tickets.service';
import PurchaseDto from '@/features/tickets/types/PurchaseDto';
import { Button as AntButton, Layout, List, Modal, Space, Spin } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
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

    ticketService.buyTickets(dto).then((res) => {
      setPurchaseFeedbackText(
        res.status === 200
          ? 'Succesfully purchased tickets.'
          : 'Unable to purchase tickets due to an error. Please try again later.'
      );
      showModal();
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
      <Space className={styles.centerContainer}>
        <List
          dataSource={flights}
          renderItem={(item) => {
            const ticketCount = item.collective_price
              ? item.collective_price / item.ticket_price
              : 1;
            return (
              <List.Item>
                <Layout
                  className={classNames(styles.layoutStyle, 'frostedGlass')}
                >
                  <Content className={styles.contentStyle}>
                    <div className={styles.centerWrapper}>
                      <div className={styles.countryDisplay}>
                        <p className={styles.centerParagraph}>
                          <b>
                            {item.route.start_point.airport_city},{' '}
                            {regionNames.of(item.route.start_point.country)}
                          </b>{' '}
                          <br />
                          {item.route.start_point.airport_name} Airport
                        </p>
                      </div>
                      <div className={styles.centerContainer}>
                        <div className={styles.dateDisplay}>
                          {dayjs(item.date_of_departure).format(
                            'dddd, MMMM D YYYY, HH:mm'
                          )}
                        </div>
                        <div className={styles.centerSvg}>
                          <Airplane className={styles.airplane} />
                          <Arrow className={styles.arrow} />
                        </div>
                      </div>
                      <div className={styles.countryDisplay}>
                        <p className={styles.centerParagraph}>
                          <b>
                            {item.route.end_point.airport_city},{' '}
                            {regionNames.of(item.route.end_point.country)}
                          </b>{' '}
                          <br />
                          {item.route.end_point.airport_name} Airport
                        </p>
                      </div>
                    </div>
                  </Content>
                  <Sider
                    className={classNames(styles.ticketPrice, {
                      [styles.borderRadius]: ticketCount <= 1,
                    })}
                  >
                    <div className={styles.priceSpace}>
                      <div>
                        <p>Single ticket</p>
                        <p className={styles.price}>€{item.ticket_price}</p>
                      </div>
                      <Button
                        action={() => buyTickets(item.id, ticketCount)}
                        type="primary"
                        text="BUY NOW"
                      ></Button>
                    </div>
                  </Sider>
                  {ticketCount > 1 && (
                    <div
                      className={classNames(
                        styles.ticketPrice,
                        styles.borderRadius
                      )}
                    >
                      <div className={styles.priceSpace}>
                        <div>
                          <p>{ticketCount} tickets</p>
                          <p className={styles.price}>
                            €{item.collective_price}
                          </p>
                        </div>
                        <Button
                          action={() => buyTickets(item.id, ticketCount)}
                          type="primary"
                          text="BUY NOW"
                        ></Button>
                      </div>
                    </div>
                  )}
                </Layout>
              </List.Item>
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
    <div className="loading">
      <Spin />
    </div>
  );
};

export default SearchData;
