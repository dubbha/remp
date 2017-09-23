import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SearchButton = ({
  text,
  type,
  size,
  active,
}) => (
  <button
    type={type}
    className={classNames(
      'searchButton',
      {
        [`searchButton_${size}`]: true,
        searchButton_active: active,
      },
    )}
  >
    {`${text}`}
  </button>
);

SearchButton.defaultProps = {
  type: 'button',
  size: 'small',
  active: false,
};

SearchButton.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  active: PropTypes.bool,
};

export default SearchButton;
