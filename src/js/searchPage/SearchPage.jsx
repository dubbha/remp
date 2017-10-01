import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from '../common/search';
import Result from '../common/result';
import List from '../common/list';
import Footer from '../common/footer';
import filmPropShape from '../common/utils/propShapes';
import * as actions from './search.actions';
import * as selectors from './search.selectors';

export class SearchPage extends Component {
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
    results: PropTypes.arrayOf(filmPropShape).isRequired,
    searchBy: PropTypes.string.isRequired,
    sortBy: PropTypes.string.isRequired,
    searchByParams: PropTypes.arrayOf(PropTypes.string).isRequired,
    sortByParams: PropTypes.arrayOf(PropTypes.string).isRequired,
    search: PropTypes.func.isRequired,
    setQuery: PropTypes.func.isRequired,
    setResults: PropTypes.func.isRequired,
    clearResults: PropTypes.func.isRequired,
    setSearchBy: PropTypes.func.isRequired,
    setSortBy: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const {
      match: { params },
      query,
      searchBy,
      sortBy,
      search,
      setQuery,
    } = this.props;

    if (params.query && params.query !== query) {
      setQuery(params.query);
      search(params.query, searchBy, sortBy);
    }
  }

  handleSearch = (e) => {
    const {
      history,
      query,
      searchBy,
      sortBy,
      search,
      clearResults,
    } = this.props;

    e.preventDefault(); // submitting the form to support search on enter

    if (query) {
      history.push(`/search/${query}`);
      search(query, searchBy, sortBy);
    } else {
      history.push('/search');
      clearResults();
    }
  }

  handleQueryChange = (e) => {
    this.props.setQuery(e.target.value);
  }

  handleSelectFilm = (title) => {
    const { history } = this.props;

    window.scrollTo(0, 0);
    history.push(`/film/${title}`);
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
    } = this.props;

    return (
      <div className="app__container">
        <Search
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
});

const mapDispatchToProps = {
  search: actions.search,
  setQuery: actions.setQuery,
  setResults: actions.setResults,
  clearResults: actions.clearResults,
  setSearchBy: actions.setSearchBy,
  setSortBy: actions.setSortBy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);
