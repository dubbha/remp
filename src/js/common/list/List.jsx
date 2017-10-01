import React from 'react';
import PropTypes from 'prop-types';
import filmPropShape from '../utils/propShapes';
import EmptyList from './EmptyList';
import ListItem from './ListItem';
import Spinner from './Spinner';
import './style.sass';

const filtered = (list, film) => {
  if (film) {
    return list.filter(item => item.show_id !== film.show_id);
  }
  return list;
};

const List = ({ results, film, onSelectFilm, isLoading }) => (
  <section className="list">
    { isLoading && <Spinner /> }
    { !isLoading && (
      results.length > 0
        ? filtered(results, film).map(item => (
          <ListItem
            item={item}
            key={item.show_id}
            onSelectFilm={onSelectFilm}
          />))
        : <EmptyList />
    )}
  </section>
);

List.defaultProps = {
  results: [],
  film: {},
};

List.propTypes = {
  results: PropTypes.arrayOf(filmPropShape),
  film: filmPropShape,
  onSelectFilm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default List;
