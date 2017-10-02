import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FilmHeader from '../common/filmHeader';
import Result from '../common/result';
import List from '../common/list';
import Footer from '../common/footer';
import filmPropShape from '../common/utils/propShapes';
import * as selectors from './film.selectors';
import * as actions from './film.actions';
import * as searchSelectors from '../search/search.selectors';
import * as searchActions from '../search/search.actions';

export class Film extends Component {
  static defaultProps = {
    film: null,
    filteredResults: null,
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
    filteredResults: PropTypes.arrayOf(filmPropShape),
    getFilm: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    setSearchBy: PropTypes.func.isRequired,
    setFilm: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    searchIsLoading: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    const {
      match: { params },
      film,
      filteredResults,
      getFilm,
      search,
    } = this.props;

    if (!film) {
      getFilm(params.title);
    } else if (film && filteredResults && filteredResults.length === 0) {
      search(film.director, 'director');
    }
  }

  handleSelectFilm = (film) => {
    const { history, setFilm } = this.props;

    setFilm(film);
    window.scrollTo(0, 0);
    history.push(`/film/${film.show_title}`);

    /*
    this.setState({
      results: results.filter(item => item.show_title !== title),
      film: results.find(item => item.show_title === title),
    });
    */
  }

  handleSearchClick = () => {
    const { history, setSearchBy, film } = this.props;

    window.scrollTo(0, 0);
    setSearchBy('director');
    history.push(`/search/${film.director.split(',')[0]}`);
  }

  render() {
    const { isLoading, film, filteredResults, searchIsLoading } = this.props;

    return (
      <div className="app__container">
        { film && (
          <FilmHeader
            film={film}
            onSearchClick={this.handleSearchClick}
          />
        )}
        { film && !isLoading && (
          <Result
            film={film}
            results={filteredResults}
          />
        )}
        <List
          results={filteredResults}
          onSelectFilm={this.handleSelectFilm}
          isLoading={isLoading || searchIsLoading}
        />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  film: selectors.filmSelector(state),
  filteredResults: selectors.filteredResultsSelector(state),
  isLoading: selectors.isLoadingSelector(state),
  searchIsLoading: searchSelectors.isLoadingSelector(state),
});

const mapDispatchToProps = {
  setFilm: actions.setFilm,
  getFilm: actions.getFilm,
  search: searchActions.search,
  setSearchBy: searchActions.setSearchBy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Film);
