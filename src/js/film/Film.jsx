import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FilmHeader from '../common/filmHeader';
import Result from '../common/result';
import List from '../common/list';
import Footer from '../common/footer';
import filmPropShape from '../common/utils/propShapes';
import * as selectors from './film.selectors';
import {
  selectors as searchSelectors,
  actions as searchActions,
} from '../search';

export class Film extends Component {
  static defaultProps = {
    film: null,
    results: null,
  };

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        title: PropTypes.string,
      }),
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    film: filmPropShape,
    results: PropTypes.arrayOf(filmPropShape),
    search: PropTypes.func.isRequired,
    setSearchBy: PropTypes.func.isRequired,
    setFilm: PropTypes.func.isRequired,
  };

  /*
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
  */

  componentWillMount() {
    const {
      match: { params },
      film,
      results,
      search,
    } = this.props;

    if (!film || !results) {
      search(params.query, 'title');
    }
  }

  handleSelectFilm = (film) => {
    const { history, setFilm } = this.props;

    window.scrollTo(0, 0);
    history.push(`/film/${film.title}`);
    setFilm(film);

    /*
    this.setState({
      results: results.filter(item => item.show_title !== title),
      film: results.find(item => item.show_title === title),
    });
    */
  }

  handleSearchClick = () => {
    const { history, setSearchBy } = this.props;

    window.scrollTo(0, 0);
    setSearchBy('director');
    history.push(`/search/${this.state.film.director}`);
  }

  render() {
    const { film, results } = this.props;

    return (
      <div className="app__container">
        <FilmHeader
          film={film}
          onSearchClick={this.handleSearchClick}
        />
        <Result
          film={film}
          results={results}
        />
        <List
          results={results}
          onSelectFilm={this.handleSelectFilm}
        />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  film: selectors.filmSelector,
  results: searchSelectors.resultsSelector(state),
  filteredResults: selectors.filteredResultsSelector(state),
});

const mapDispatchToProps = {
  setSearchBy: searchActions.setSearchBy,
  search: searchActions.search,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Film);
