import React from 'react';
import PropTypes from 'prop-types';
import './style.sass';

const SearchResult = ({ results }) => (
  results.length > 0 && (
    <div className="searchResult">
      <span className="searchResult__line">{`${results.length} movies found`}</span>
      <span className="searchResult__line">
        Sort by
        <a className="searchResult__link">release date</a>
        <a className="searchResult__link searchResult__link_active">rating</a>
      </span>
    </div>
  )
);

SearchResult.defaultProps = {
  results: [],
};

SearchResult.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    poster: PropTypes.string,
    title: PropTypes.string,
    rating: PropTypes.string,
    category: PropTypes.string,
    release_year: PropTypes.string,
    runtime: PropTypes.string,
    summary: PropTypes.string,
    director: PropTypes.string,
    show_cast: PropTypes.string,
    show_id: PropTypes.number,
  })),
};

export default SearchResult;
