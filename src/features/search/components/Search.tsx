import { useEffect, useState } from 'react';
import { SearchParams } from '../types/SearchParams';
import SearchBar from './SearchBar';
import SearchData from './SearchData';
import styles from '../styles/search.module.scss';

const Search = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>();

  useEffect(() => {}, []);

  function handleDataChange(newData: SearchParams | undefined) {
    setSearchParams(newData);
  }

  return (
    <div className={styles.searchContainer}>
      <SearchBar onDataChanged={handleDataChange} />
      <SearchData searchParams={searchParams} />
    </div>
  );
};

export default Search;
