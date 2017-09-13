import React from 'react';
import Logo from '../logo';
import './style.sass';

const Search = () => (
  <header className="search">
    <Logo />
    <div className="search__header">find your movie</div>
    <form>
      <input type="text" className="search__input" name="search" />
    </form>
  </header>
);

export default Search;
