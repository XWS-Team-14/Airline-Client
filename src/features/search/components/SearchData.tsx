import { useEffect, useState } from 'react';
import { fetchData, fetchPlaces } from '../service/search.service';
import { SelectOptions } from '../types/SelectOptions';
import { SearchParams } from '../types/SearchParams';
import SearchBar from './SearchBar';

interface SearchDataProps {
    searchParams: SearchParams | undefined;
  }

const SearchData = ({searchParams} : SearchDataProps) => {

  useEffect(() => {
    fetchData(searchParams)
  }, [searchParams]);


  return (
    <div >
       <p>TEST</p>
    </div>
  );
};

export default SearchData;
