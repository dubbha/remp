import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Search from '../common/search';
import Result from '../common/result';
import List from '../common/list';
import Footer from '../common/footer';
import mockSearchResults from '../App/mockSearchResults';

const searchByParams = ['title', 'director'];
const sortByParams = ['release date', 'rating'];

const defaultSearchBy = searchByParams[1];
const defaultSortBy = sortByParams[0];

const sortByApiMap = {
  'release date': 'release_year',
  rating: 'rating',
};

const sortFnFabric = sortBy => (a, b) => b[sortByApiMap[sortBy]] - a[sortByApiMap[sortBy]];

export default class SearchPage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        query: PropTypes.string,
      }),
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    const { match: { params: { query } } } = props;

    this.state = {
      query,
      results: query ? mockSearchResults.sort(sortFnFabric(defaultSortBy)) : [],
      searchBy: defaultSearchBy,
      sortBy: defaultSortBy,
    };
  }

  handleSearch = (e) => {
    const { history } = this.props;
    e.preventDefault();

    if (this.state.query) {
      history.push(`/search/${this.state.query}`);
      this.setState({ results: mockSearchResults.sort(sortFnFabric(this.state.sortBy)) });
    } else {
      history.push('/search');
      this.setState({ results: [] });
    }
  }

  handleQueryChange = (e) => {
    this.setState({ query: e.target.value });
  }

  handleSelectFilm = (title) => {
    const { history } = this.props;

    window.scrollTo(0, 0);
    history.push(`/film/${title}`);
  }

  handleSearchByChange = (searchBy) => {
    this.setState({ searchBy });
  }

  handleSortByChange = (sortBy) => {
    const sorted = this.state.results.sort(sortFnFabric(sortBy));

    this.setState({
      sortBy,
      results: sorted,
    });
  }

  render() {
    return (
      <div className="app__container">
        <Search
          query={this.state.query}
          onQueryChange={this.handleQueryChange}
          onSearch={this.handleSearch}
          searchBy={this.state.searchBy}
          onSearchByChange={this.handleSearchByChange}
          searchByParams={searchByParams}
        />
        <Result
          results={this.state.results}
          sortBy={this.state.sortBy}
          onSortByChange={this.handleSortByChange}
          sortByParams={sortByParams}
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
