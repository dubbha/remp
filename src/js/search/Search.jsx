import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../logo';
import SearchToolbar from './searchToolbar';
import './style.sass';

const Search = ({ onSearch }) => (
  <header className="search">
    <Logo />
    <div className="search__header">find your movie</div>
    <form
      autoComplete="off"
      onSubmit={onSearch}
    >
      <div className="search__container">
        <input
          type="text"
          className="search__input"
          name="search"
          style={{ backgroundImage: '../../img/enter.svg' }}
        />
        <div className="search__icon" />
      </div>
      <SearchToolbar />
    </form>
  </header>
);

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;
