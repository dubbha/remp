import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../logo';
import FilmButton from './FilmButton';
import ErrorBoundary from '../errorBoundary';
import './style.sass';

const Film = ({ film, onSearchClick }) => (
  <header className="film">
    <ErrorBoundary>
      <div className="film__headerContainer">
        <Logo />
        <FilmButton onSearchClick={onSearchClick} />
      </div>
      <div className="film__infoSection">
        <div className="film__poster">
          <img
            className="film__image"
            src={film.poster}
            alt={film.show_title}
          />
        </div>
        <div className="film__details">
          <div className="film__title">{film.show_title}<div className="film__rating">{film.rating}</div></div>
          <div className="film__category">{film.category}</div>
          <div className="film__year">{film.release_year}</div>
          <div className="film__runtime">{film.runtime}</div>
          <div className="film__summary">{film.summary}</div>
          <div className="film__director">Director: {film.director}</div>
          <div className="film__cast">Cast: {film.show_cast}</div>
        </div>
      </div>
    </ErrorBoundary>
  </header>
);

Film.propTypes = {
  film: PropTypes.shape({
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
  }).isRequired,
  onSearchClick: PropTypes.func.isRequired,
};

export default Film;
