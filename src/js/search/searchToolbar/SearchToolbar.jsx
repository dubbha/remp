import React from 'react';
import SearchBySwitch from './SearchBySwitch';
import SearchButton from './SearchButton';

const SearchToolbar = () => (
  <div className="searchToolbar">
    <SearchBySwitch />
    <SearchButton
      text="search"
      type="submit"
      size="large"
      active
    />
  </div>
);

export default SearchToolbar;
