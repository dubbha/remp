import React from 'react';
import PropTypes from 'prop-types';
import SearchResult from './SearchResult';
import FilmResult from './FilmResult';
import './style.sass';

const Result = ({ results, film }) => (
  <div className="result">
    {
      film
        ? <FilmResult film={film} />
        : <SearchResult results={results} />
    }
  </div>
);

Result.defaultProps = {
  results: [],
  film: {},
};

const filmPropShape = PropTypes.shape({
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
});

Result.propTypes = {
  results: PropTypes.arrayOf(filmPropShape),
  film: filmPropShape,
};

export default Result;
