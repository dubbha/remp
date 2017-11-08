import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FilmHeader from '../common/filmHeader';
import Result from '../common/result';
import List from '../common/list';
import Footer from '../common/footer';
import filmPropShape from '../common/utils/propShapes';
import * as selectors from '../common/store/selectors';
import * as actions from '../common/store/actions';

export class Film extends Component {
  static defaultProps = {
    film: null,
    filteredResults: null,
  };

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
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
    isFilmLoading: PropTypes.bool.isRequired,
  };

  static fetchData = (dispatch, match) =>
    dispatch(this.props.getFilm(match.params.id));

  componentWillMount = () => {
    const {
      match: { params },
      film,
      filteredResults,
      getFilm,
      getFilmDetails,
      searchByDirector,
    } = this.props;

    const id = +params.id;

    if (!film) {
      getFilm(id);
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
    if (nextProps.match.params.id !== this.props.match.params.id) {
      const film = nextProps.film;
      const id = nextProps.match.params.id;
      const { getFilm, getFilmDetails } = this.props;

      if (!film) {
        getFilm(id);
      } else if (!film.runtime || !film.cast || !film.director) {
        getFilmDetails(film);
      }
    }
  }

  handleSelectFilm = (film) => {
    const { history } = this.props;

    window.scrollTo(0, 0);
    history.push(`/film/${film.id}/${encodeURIComponent(film.title)}`);
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
    const { isLoading, isFilmLoading, film, filteredResults } = this.props;

    return (
      <div className="app__container">
        {
          film && (
            <FilmHeader
              film={film}
              onSearchClick={this.handleSearchClick}
            />
          )
        }
        {
          film && !isFilmLoading && (
            <Result
              film={film}
              results={filteredResults}
            />
          )
        }
        <List
          results={filteredResults}
          onSelectFilm={this.handleSelectFilm}
          isLoading={isLoading || isFilmLoading}
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
  isFilmLoading: selectors.isFilmLoadingSelector(state),
});

const mapDispatchToProps = {
  getFilm: actions.getFilm,
  getFilmDetails: actions.getFilmDetails,
  searchByDirector: actions.searchByDirector,
  setSearchBy: actions.setSearchBy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Film);
