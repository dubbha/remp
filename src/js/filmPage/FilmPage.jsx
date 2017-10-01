import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Film from '../common/film';
import Result from '../common/result';
import List from '../common/list';
import Footer from '../common/footer';
import filmPropShape from '../common/utils/propShapes';
import { selectors } from '../searchPage';

export class FilmPage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        title: PropTypes.string,
      }),
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    results: PropTypes.arrayOf(filmPropShape).isRequired,
  };

  constructor(props) {
    super(props);

    const {
      match: { params: { title } },
      results,
    } = props;

    this.state = {
      results: results.filter(item => item.show_title !== title),
      film: results.find(item => item.show_title === title),
    };
  }

  handleSelectFilm = (title) => {
    const { history, results } = this.props;

    window.scrollTo(0, 0);
    history.push(`/film/${title}`);

    this.setState({
      results: results.filter(item => item.show_title !== title),
      film: results.find(item => item.show_title === title),
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

const mapStateToProps = state => ({
  results: selectors.resultsSelector(state),
});

export default connect(
  mapStateToProps,
)(FilmPage);
