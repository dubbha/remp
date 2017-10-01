import axios from 'axios';

const sortByApiMap = {
  'release date': 'release_year',
  rating: 'rating',
};

const sortFnFabric = sortBy => (a, b) => b[sortByApiMap[sortBy]] - a[sortByApiMap[sortBy]];

export const actionTypes = {
  SET_QUERY: 'SET_QUERY',
  SET_RESULTS: 'SET_RESULTS',
  CLEAR_RESULTS: 'CLEAR_RESULTS',
  SET_SEARCH_BY: 'SET_SEARCH_BY',
  SET_SORT_BY: 'SET_SORT_BY',
};

export const setQuery = query => ({
  type: actionTypes.SET_QUERY,
  query,
});

export const setResults = (results, sortBy) => ({
  type: actionTypes.SET_RESULTS,
  results: Array.isArray(results) ? results.sort(sortFnFabric(sortBy)) : [results],
});

export const clearResults = () => ({
  type: actionTypes.CLEAR_RESULTS,
});

export const search = (query, searchBy, sortBy) => dispatch =>
  axios.get('/api', { params: { [searchBy]: query } })
    .then(res => dispatch(setResults(res.data, sortBy)))
    .catch(dispatch(clearResults()));


export const setSearchBy = searchBy => ({
  type: actionTypes.SET_SEARCH_BY,
  searchBy,
});

export const setSortBy = sortBy => ({
  type: actionTypes.SET_SORT_BY,
  sortBy,
});

