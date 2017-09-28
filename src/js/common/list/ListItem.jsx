import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      poster: PropTypes.string.isRequired,
    }).isRequired,
    onSelectFilm: PropTypes.func.isRequired,
  };

  handleSelectFilm = () => {
    const { onSelectFilm, item } = this.props;

    onSelectFilm(item.show_title);
  }

  render() {
    const { item } = this.props;

    return (
      <div className="list__item">
        <div className="list__container">
          <a
            role="link"
            tabIndex={0}
            className="list__link"
            onClick={this.handleSelectFilm}
          >
            <img
              src={item.poster}
              alt={item.show_title}
              className="list__image"
            />
          </a>
          <div className="list__titleYearBlock">
            <span className="list__title">{item.show_title}</span>
            <span className="list__year">{item.release_year}</span>
          </div>
          <div className="list__category">{item.category}</div>
        </div>
      </div>
    );
  }
}
