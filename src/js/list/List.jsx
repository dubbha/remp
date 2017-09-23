import React from 'react';
import PropTypes from 'prop-types';
import EmptyList from './EmptyList';
import ListItem from './ListItem';
import './style.sass';

const filtered = (list, film) => {
  if (film) {
    return list.filter(item => item.show_id !== film.show_id);
  }
  return list;
};

const List = ({ results, film, onSelectFilm }) => (
  <section className="list">
    {
      results.length > 0
        ? filtered(results, film).map(item => (
          <ListItem
            item={item}
            key={item.show_id}
            onSelectFilm={onSelectFilm}
          />))
        : <EmptyList />
    }
  </section>
);

List.defaultProps = {
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

List.propTypes = {
  results: PropTypes.arrayOf(filmPropShape),
  film: filmPropShape,
  onSelectFilm: PropTypes.func.isRequired,
};

export default List;
