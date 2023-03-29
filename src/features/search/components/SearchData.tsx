import Button from '@/common/components/button/Button';
import { Layout, List, Space } from 'antd';
import { useEffect, useState } from 'react';
import { fetchData, fetchDataPage } from '../service/search.service';
import { SearchFlightsDto } from '../types/SearchFlightsDto';
import { SearchParams } from '../types/SearchParams';
import styles from '../styles/search.module.scss';

interface SearchDataProps {
  searchParams: SearchParams | undefined;
}

const SearchData = ({ searchParams }: SearchDataProps) => {
  const [flights, setFlights] = useState<SearchFlightsDto[]>([]);
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');
  const { Header, Content, Footer, Sider } = Layout;

  useEffect(() => {
    fetchData(searchParams).then((data) => {
      setFlights(data.results);
      setNext(data.next);
      setPrevious(data.previous);
    });
  }, [searchParams]);

  function buyTickets(id: string, ticketNumber: number) {
    console.log(id);
    console.log(ticketNumber);
  }

  function changePage(url: string) {
    if (url == null) return;
    fetchDataPage(url).then((data) => {
      setFlights(data.results);
      setNext(data.next);
      setPrevious(data.previous);
    });
  }

  return (
    <div className={styles.searchBarContainer}>
      <Space className={styles.centerContainer}>
        <List
          dataSource={flights}
          renderItem={(item) => (
            <List.Item style={{ height: 120, background: 'none', border: 0 }}>
              <Layout className={styles.layoutStyle}>
                <Content className={styles.contentStyle}>
                  <Space className={styles.centerWrapper}>
                    <Space className={styles.countryDisplay}>
                      <p className={styles.centerParagraph}>
                        {item.route.start_point.airport_city} <br />
                        {item.route.start_point.country} - '
                        {item.route.start_point.airport_name}'
                      </p>
                    </Space>
                    <Space className={styles.centerContainer}>
                      <Space className={styles.dateDisplay}>
                        {item.date_of_departure.toString()}
                      </Space>
                      <Space className={styles.centerSvg}>
                        <svg
                          viewBox="0 0 23.1 24"
                          className={styles.svgs}
                          style={{ width: 30, marginTop: 3 }}
                        >
                          <path
                            fill="#06038d"
                            stroke="none"
                            d="m19.2 10.3-3.7-.1a19 19 0 0 1-2-2.3.46.46 0 0 0 .3-.5v-.6a.47.47 0 0 0-.5-.5h-1.2l-2.5-3C8.5 1.9 7.6.9 7.4.7A3.3 3.3 0 0 0 5.3 0l4.3 9.8v.6H6.9a19.35 19.35 0 0 0-2.9.4L1.2 7.7H.1l1.4 3.6c-.9.2-1.5.5-1.5.8s.7.6 1.6.8L.2 16.7h1.1l2.9-3.3a26.55 26.55 0 0 0 2.8.3h2.7v.5L5.4 24a3.46 3.46 0 0 0 2.1-.7c.2-.2 4.3-5.2 4.8-5.7h1a.56.56 0 0 0 .5-.6v-.6a.52.52 0 0 0-.2-.4c.9-1 1.5-1.9 1.9-2.3h3.7c.7 0 3.9-.8 3.9-1.7s-3.3-1.7-3.9-1.7z"
                          ></path>
                        </svg>
                        <svg viewBox="0 0 226 12" style={{ width: 400 }}>
                          <path
                            fill="#e1e1e1"
                            d="m225.9 5.71-3.15-5.4a.57.57 0 0 0-.9-.15c-.31.15-.46.6-.16.75l2.71 4.5H.6A.65.65 0 0 0 0 6a.65.65 0 0 0 .6.6h223.65l-2.7 4.49c-.15.3-.15.6.15.75.15 0 .15.15.3.15a1.14 1.14 0 0 0 .6-.3l3.15-5.39a.37.37 0 0 0 .15-.6z"
                          ></path>
                        </svg>
                      </Space>
                    </Space>
                    <Space className={styles.countryDisplay}>
                      <p className={styles.centerParagraph}>
                        {item.route.end_point.airport_city} <br />
                        {item.route.end_point.country} - '
                        {item.route.end_point.airport_name}'
                      </p>
                    </Space>
                  </Space>
                </Content>
                <Sider
                  className={styles.ticketPrice}
                  style={{ background: 'rgb(253,253,253)' }}
                >
                  <Space className={styles.priceSpace}>
                    <p className={styles.cleanParagraph}>
                      TICKET PRICE: {item.ticket_price}€
                    </p>
                    <Button
                      action={() => buyTickets(item.id, 1)}
                      type="primary"
                      text="BUY NOW"
                    ></Button>
                  </Space>
                </Sider>
                <Sider
                  className={styles.ticketPriceCollective}
                  style={{ background: 'rgb(253,253,253)' }}
                >
                  <Space className={styles.priceSpace}>
                    <p className={styles.cleanParagraph}>
                      {item.collective_price / item.ticket_price} TICKET PRICE:{' '}
                      {item.collective_price}€
                    </p>
                    <Button
                      action={() =>
                        buyTickets(
                          item.id,
                          item.collective_price / item.ticket_price
                        )
                      }
                      type="primary"
                      text="BUY NOW"
                    ></Button>
                  </Space>
                </Sider>
              </Layout>
            </List.Item>
          )}
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
    </div>
  );
};

export default SearchData;
