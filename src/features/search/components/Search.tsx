import { useEffect, useState } from 'react';
import { fetchData} from '../service/search.service';
import { SelectOptions } from '../types/SelectOptions';
import { SearchParams } from '../types/SearchParams';
import SearchBar from './SearchBar';
import SearchData from './SearchData';

const Search = () => {

  const [searchParams , setSearchParams] = useState<SearchParams>();

  useEffect(() => {
  }, []);


  function handleDataChange(newData: SearchParams | undefined) {
    setSearchParams(newData);
  }

  
  return (
    <div >
        <SearchBar onDataChanged={handleDataChange}/>
        <SearchData searchParams={searchParams} />
    </div>
  );
};

export default Search;
