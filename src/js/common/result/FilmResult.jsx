import React from 'react';
import PropTypes from 'prop-types';
import './style.sass';

const Result = ({ film }) => (
  <div>
    Films by { film.director.split(',')[0] }
  </div>
);

Result.propTypes = {
  film: PropTypes.shape({
    director: PropTypes.string,
  }).isRequired,
};

export default Result;
