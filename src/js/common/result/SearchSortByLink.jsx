import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class SearchSortByLink extends Component {
  handleClick = () => {
    const { onClickWithText, text } = this.props;

    if (onClickWithText) {
      onClickWithText(text);
    }
  }

  render() {
    const {
      text,
      active,
    } = this.props;

    return (
      <a
        role="link"
        tabIndex={0}
        className={classNames(
          'searchResult__link',
          { searchResult__link_active: active },
        )}
        onClick={this.handleClick}
      >
        {`${text}`}
      </a>
    );
  }
}

SearchSortByLink.defaultProps = {
  active: false,
  onClickWithText: null,
};

SearchSortByLink.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClickWithText: PropTypes.func,
};
