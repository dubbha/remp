import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ item, onSelectFilm }) => (
  <div className="list__item">
    <div className="list__container">
      <img
        src={item.poster}
        className="list__image"
        onClick={() => onSelectFilm(item.show_id)} // eslint-disable-line react/jsx-no-bind
      />
      <div className="list__titleYearBlock">
        <span className="list__title">{item.show_title}</span>
        <span className="list__year">{item.release_year}</span>
      </div>
      <div className="list__category">{item.category}</div>
    </div>
  </div>
);

ListItem.propTypes = {
  item: PropTypes.shape({
    poster: PropTypes.string.isRequired,
  }).isRequired,
  onSelectFilm: PropTypes.func.isRequired,
};

export default ListItem;
