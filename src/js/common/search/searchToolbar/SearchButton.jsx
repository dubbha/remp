import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class SearchButton extends Component {
  handleClick = () => {
    const { onClickWithText, text } = this.props;

    if (onClickWithText) {
      onClickWithText(text);
    }
  }

  render() {
    const {
      text,
      type,
      size,
      active,
    } = this.props;

    return (
      <button
        type={type}
        className={classNames(
          'searchButton',
          {
            [`searchButton_${size}`]: true,
            searchButton_active: active,
          },
        )}
        onClick={this.handleClick}
      >
        {`${text}`}
      </button>
    );
  }
}

SearchButton.defaultProps = {
  type: 'button',
  size: 'small',
  active: false,
  onClickWithText: null,
};

SearchButton.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  active: PropTypes.bool,
  onClickWithText: PropTypes.func,
};
