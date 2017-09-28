import React from 'react';
import PropTypes from 'prop-types';
import SearchResult from './SearchResult';
import FilmResult from './FilmResult';
import filmPropShape from '../utils/propShapes';
import './style.sass';

const Result = ({
  results,
  film,
  sortBy,
  onSortByChange,
  sortByParams,
}) => (
  <div className="result">
    {
      film
        ? (
          <FilmResult film={film} />
        )
        : (
          <SearchResult
            results={results}
            sortBy={sortBy}
            onSortByChange={onSortByChange}
            sortByParams={sortByParams}
          />
        )
    }
  </div>
);

Result.defaultProps = {
  results: [],
  film: null,
  sortBy: null,
  onSortByChange: null,
  sortByParams: null,
};

Result.propTypes = {
  results: PropTypes.arrayOf(filmPropShape),
  film: filmPropShape,
  sortBy: PropTypes.string,
  onSortByChange: PropTypes.func,
  sortByParams: PropTypes.arrayOf(PropTypes.string),
};

export default Result;
