import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchHeader from '../common/searchHeader';
import Result from '../common/result';
import List from '../common/list';
import Footer from '../common/footer';
import filmPropShape from '../common/utils/propShapes';
import * as actions from './search.actions';
import * as selectors from './search.selectors';
import { actions as filmActions } from '../film';

export class Search extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        query: PropTypes.string,
      }),
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    query: PropTypes.string.isRequired,
    results: PropTypes.arrayOf(PropTypes.shape(filmPropShape)).isRequired,
    searchBy: PropTypes.string.isRequired,
    sortBy: PropTypes.string.isRequired,
    searchByParams: PropTypes.arrayOf(PropTypes.string).isRequired,
    sortByParams: PropTypes.arrayOf(PropTypes.string).isRequired,
    isLoading: PropTypes.bool.isRequired,
    searchByTitle: PropTypes.func.isRequired,
    searchByDirector: PropTypes.func.isRequired,
    setQuery: PropTypes.func.isRequired,
    setResults: PropTypes.func.isRequired,
    clearResults: PropTypes.func.isRequired,
    setSearchBy: PropTypes.func.isRequired,
    setSortBy: PropTypes.func.isRequired,
    setFilm: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const {
      match: { params },
      query,
      searchBy,
      sortBy,
      searchByTitle,
      searchByDirector,
      setQuery,
    } = this.props;

    if (params.query && params.query !== query) {
      setQuery(params.query);
      if (searchBy === 'director') {
        searchByDirector(params.query, sortBy);
      } else {
        searchByTitle(params.query, sortBy);
      }
    }
  }

  handleSearch = (e) => {
    const {
      history,
      query,
      searchBy,
      sortBy,
      searchByTitle,
      searchByDirector,
      clearResults,
    } = this.props;

    e.preventDefault(); // submitting the form to support search on enter

    if (query) {
      history.push(`/search/${query}`);
      if (searchBy === 'director') {
        searchByDirector(query, sortBy);
      } else {
        searchByTitle(query, sortBy);
      }
    } else {
      history.push('/search');
      clearResults();
    }
  }

  handleQueryChange = (e) => {
    this.props.setQuery(e.target.value);
  }

  handleSelectFilm = (film) => {
    const { history, setFilm } = this.props;

    setFilm(film);
    window.scrollTo(0, 0);
    history.push(`/film/${film.title}`);
  }

  handleSearchByChange = (searchBy) => {
    this.props.setSearchBy(searchBy);
  }

  handleSortByChange = (sortBy) => {
    const { setSortBy, results, setResults } = this.props;

    setSortBy(sortBy);
    setResults(results, sortBy);
  }

  render() {
    const {
      query,
      results,
      searchBy,
      sortBy,
      searchByParams,
      sortByParams,
      isLoading,
    } = this.props;

    return (
      <div className="app__container">
        <SearchHeader
          query={query}
          onQueryChange={this.handleQueryChange}
          onSearch={this.handleSearch}
          searchBy={searchBy}
          onSearchByChange={this.handleSearchByChange}
          searchByParams={searchByParams}
        />
        <Result
          results={results}
          sortBy={sortBy}
          onSortByChange={this.handleSortByChange}
          sortByParams={sortByParams}
        />
        <List
          results={results}
          onSelectFilm={this.handleSelectFilm}
          isLoading={isLoading}
        />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  query: selectors.querySelector(state),
  results: selectors.resultsSelector(state),
  searchBy: selectors.searchBySelector(state),
  sortBy: selectors.sortBySelector(state),
  searchByParams: selectors.searchByParamsSelector(state),
  sortByParams: selectors.sortByParamsSelector(state),
  isLoading: selectors.isLoadingSelector(state),
});

const mapDispatchToProps = {
  searchByTitle: actions.searchByTitle,
  searchByDirector: actions.searchByDirector,
  setQuery: actions.setQuery,
  setResults: actions.setResults,
  clearResults: actions.clearResults,
  setSearchBy: actions.setSearchBy,
  setSortBy: actions.setSortBy,
  setFilm: filmActions.setFilm,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
