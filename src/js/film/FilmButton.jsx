import React from 'react';
import PropTypes from 'prop-types';

const SearchButton = ({ onClearFilm }) => (
  <button
    className="film__button"
    onClick={onClearFilm}
  >
    Search
  </button>
);

SearchButton.propTypes = {
  onClearFilm: PropTypes.func.isRequired,
};

export default SearchButton;
