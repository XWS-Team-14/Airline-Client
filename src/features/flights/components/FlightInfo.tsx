import Airplane from '@/assets/svg/airplane.svg';
import Arrow from '@/assets/svg/arrow.svg';
import Button from '@/common/components/button/Button';
import { SearchFlightsDto } from '@/features/search/types/SearchFlightsDto';
import { Layout, List } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import styles from '../../search/styles/search.module.scss';

interface FlightInfoProps {
  item: SearchFlightsDto;
  page: 'Search' | 'Overview' | 'Ticket';
  buyAction?: () => void;
  cancelAction?: () => void;
}

const FlightInfo = ({
  item,
  page,
  buyAction,
  cancelAction,
}: FlightInfoProps) => {
  const isSoldOut = () => item.number_of_free_spaces <= 0;
  const { Content, Sider } = Layout;
  const ticketCount = () => {
    if (page === 'Search') {
      return item.collective_price
        ? item.collective_price / item.ticket_price
        : 1;
    } else {
      return 1;
    }
  };
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  return (
    <List.Item>
      <Layout className={classNames(styles.layoutStyle, 'frostedGlass')}>
        <Content className={styles.contentStyle}>
          <div className={styles.centerWrapper}>
            <div className={styles.countryDisplay}>
              <p className={styles.centerParagraph}>
                <b>
                  {item.route.start_point.airport_city},{' '}
                  {item.route.start_point.country}
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
                  {item.route.end_point.country}
                </b>{' '}
                <br />
                {item.route.end_point.airport_name} Airport
              </p>
            </div>
          </div>
        </Content>
        <Sider
          className={classNames(styles.ticketPrice, {
            [styles.borderRadius]: ticketCount() <= 1,
          })}
        >
          <div className={styles.priceSpace}>
            <div>
              <p>Single ticket</p>
              <p className={styles.price}>€{item.ticket_price}</p>
            </div>
            {page === 'Overview' && (
              <div>
                <p>Free seats</p>
                <p className={styles.price}>
                  {item.number_of_free_spaces} / {item.number_of_seats}
                </p>
              </div>
            )}
            {buyAction && (
              <div>
                <Button
                  action={buyAction}
                  type="primary"
                  text={isSoldOut() ? 'Sold out' : 'BUY NOW'}
                  disabled={isSoldOut()}
                ></Button>
              </div>
            )}
          </div>
        </Sider>
        {page === 'Overview' && (
          <Sider className={styles.ticketPrice}>
            <div className={styles.priceSpace}>
              <Button
                action={cancelAction}
                type="danger"
                text="Cancel"
              ></Button>
            </div>
          </Sider>
        )}
        {ticketCount() > 1 && (
          <div className={classNames(styles.ticketPrice, styles.borderRadius)}>
            <div className={styles.priceSpace}>
              <div>
                <p>{ticketCount()} tickets</p>
                <p className={styles.price}>€{item.collective_price}</p>
              </div>
              {buyAction && (
                <Button
                  action={buyAction}
                  type="primary"
                  text="BUY NOW"
                ></Button>
              )}
            </div>
          </div>
        )}
      </Layout>
    </List.Item>
  );
};

export default FlightInfo;
