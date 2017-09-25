import React from 'react';
import PropTypes from 'prop-types';
import SearchSortByLink from './SearchSortByLink';
import './style.sass';

const SearchResult = ({
  results,
  sortBy,
  onSortByChange,
  sortByParams,
}) => (
  results.length > 0 && (
    <div className="searchResult">
      <span className="searchResult__line">{`${results.length} movies found`}</span>
      <span className="searchResult__line">
        Sort by
        {
          sortByParams.map(item => (
            <SearchSortByLink
              key={item}
              text={item}
              active={sortBy === item}
              onClickWithText={onSortByChange}
            />
          ))
        }
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
  sortBy: PropTypes.string.isRequired,
  onSortByChange: PropTypes.func.isRequired,
  sortByParams: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchResult;
