import React from 'react';
import PropTypes from 'prop-types';

const SearchButton = ({ onSearchClick }) => (
  <button
    className="film__button"
    onClick={onSearchClick}
  >
    Search
  </button>
);

SearchButton.propTypes = {
  onSearchClick: PropTypes.func.isRequired,
};

export default SearchButton;
