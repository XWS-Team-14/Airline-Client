import Button from '@/common/components/button/Button';
import { DatePicker, DatePickerProps, InputNumber, Select } from 'antd';
import { useEffect, useState } from 'react';
import { fetchPlaces } from '../service/search.service';
import styles from '../styles/search.module.scss';
import { SearchParams } from '../types/SearchParams';
import { SelectOptions } from '../types/SelectOptions';

interface SearchBarProps {
  onDataChanged: (newData: SearchParams | undefined) => void;
}

const SearchBar = ({ onDataChanged }: SearchBarProps) => {
  const [placeOptions, setPlaceOptions] = useState<SelectOptions[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>();

  useEffect(() => {
    fetchPlaces().then((data) => setPlaceOptions(data));
  }, []);

  function sendDataToParent() {
    onDataChanged(searchParams);
  }

  function changeStartPoint(value: string) {
    let temp: SearchParams = {
      start_point: value,
      end_point: searchParams?.end_point,
      date: searchParams?.date,
      number_of_tickets: searchParams?.number_of_tickets,
    };
    setSearchParams(temp);
  }
  function changeEndPoint(value: string) {
    let temp: SearchParams = {
      start_point: searchParams?.start_point,
      end_point: value,
      date: searchParams?.date,
      number_of_tickets: searchParams?.number_of_tickets,
    };
    setSearchParams(temp);
  }
  const changeDate: DatePickerProps['onChange'] = (date, value) => {
    let temp: SearchParams = {
      start_point: searchParams?.start_point,
      end_point: searchParams?.end_point,
      date: value,
      number_of_tickets: searchParams?.number_of_tickets,
    };
    setSearchParams(temp);
  };
  function changeNumberOfTickets(value: number | null) {
    setSearchParams({
      start_point: searchParams?.start_point,
      end_point: searchParams?.end_point,
      date: searchParams?.date,
      number_of_tickets: value ? value : 1,
    });
  }

  return (
    <div className={styles.searchBarContainer}>
      <Select
        showSearch
        placeholder="FROM"
        optionFilterProp="children"
        style={{ width: 240, marginRight: 5 }}
        options={placeOptions}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        onChange={changeStartPoint}
      />
      <Select
        showSearch
        placeholder="TO"
        optionFilterProp="children"
        style={{ width: 240, marginRight: 5 }}
        options={placeOptions}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        onChange={changeEndPoint}
      />
      <DatePicker
        onChange={changeDate}
        placeholder="DEPARTURE"
        style={{ width: 160, marginRight: 5 }}
      />
      <InputNumber
        onChange={changeNumberOfTickets}
        min={1}
        max={100}
        placeholder="TICKETS"
        style={{ width: 160, marginRight: 5 }}
      />
      <Button
        action={sendDataToParent}
        type="primary"
        text="SEARCH"
        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
      ></Button>
    </div>
  );
};

export default SearchBar;
