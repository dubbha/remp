import PropTypes from 'prop-types';

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

export default filmPropShape;
