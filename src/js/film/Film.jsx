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
    film: PropTypes.shape(filmPropShape),
    filteredResults: PropTypes.arrayOf(PropTypes.shape(filmPropShape)),
    getFilm: PropTypes.func.isRequired,
    getFilmDetails: PropTypes.func.isRequired,
    searchByDirector: PropTypes.func.isRequired,
    setSearchBy: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    searchIsLoading: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    const {
      match: { params },
      film,
      filteredResults,
      getFilm,
      getFilmDetails,
      searchByDirector,
    } = this.props;

    const title = decodeURIComponent(params.title);

    if (!film) {
      getFilm(title);
    } else {
      if (!film.runtime || !film.cast || !film.director) {
        getFilmDetails(film);
      }
      if (filteredResults && filteredResults.length === 0 && film.director) {
        searchByDirector(film.director);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.title !== this.props.match.params.title) {
      const film = nextProps.film;
      const title = decodeURIComponent(nextProps.match.params.title);
      const { getFilm, getFilmDetails } = this.props;

      if (!film) {
        getFilm(title);
      } else if (!film.runtime || !film.cast || !film.director) {
        getFilmDetails(film);
      }
    }
  }

  handleSelectFilm = (film) => {
    const { history } = this.props;

    window.scrollTo(0, 0);
    history.push(`/film/${encodeURIComponent(film.title)}`);
  }

  handleSearchClick = () => {
    const { history, setSearchBy, film } = this.props;

    window.scrollTo(0, 0);

    if (film.director) {
      setSearchBy('director');
      history.push(`/search/${encodeURIComponent(film.director)}`);
    } else {
      history.push('/search');
    }
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

const mapStateToProps = (state, props) => ({
  film: selectors.filmSelector(state, props),
  filteredResults: selectors.filteredResultsSelector(state, props),
  isLoading: selectors.isLoadingSelector(state),
  searchIsLoading: searchSelectors.isLoadingSelector(state),
});

const mapDispatchToProps = {
  getFilm: actions.getFilm,
  getFilmDetails: actions.getFilmDetails,
  searchByDirector: searchActions.searchByDirector,
  setSearchBy: searchActions.setSearchBy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Film);
