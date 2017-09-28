import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Film from '../common/film';
import Result from '../common/result';
import List from '../common/list';
import Footer from '../common/footer';
import mockSearchResults from '../App/mockSearchResults';

export default class FilmPage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        title: PropTypes.string,
      }),
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    const { match: { params: { title } } } = props;

    this.state = {
      results: mockSearchResults.filter(item => item.show_title !== title),
      film: mockSearchResults.find(item => item.show_title === title),
    };
  }

  handleSelectFilm = (title) => {
    const { history } = this.props;

    window.scrollTo(0, 0);
    history.push(`/film/${title}`);

    this.setState({
      results: mockSearchResults.filter(item => item.show_title !== title),
      film: this.state.results.find(item => item.show_title === title),
    });
  }

  handleSearchClick = () => {
    const { history } = this.props;

    window.scrollTo(0, 0);
    history.push(`/search/${this.state.film.director}`);
  }

  render() {
    return (
      <div className="app__container">
        <Film
          film={this.state.film}
          onSearchClick={this.handleSearchClick}
        />
        <Result
          film={this.state.film}
          results={this.state.results}
        />
        <List
          results={this.state.results}
          onSelectFilm={this.handleSelectFilm}
        />
        <Footer />
      </div>
    );
  }
}
