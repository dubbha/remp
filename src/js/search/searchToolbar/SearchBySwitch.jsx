import React from 'react';
import SearchButton from './SearchButton';

const SearchBySwitch = () => (
  <div className="searchBySwitch">
    <span className="searchBySwitch__text">Search By</span>
    <SearchButton
      text="Title"
      active
    />
    <SearchButton
      text="Director"
    />
  </div>
);

export default SearchBySwitch;
