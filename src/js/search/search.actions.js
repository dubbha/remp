import axios from 'axios';
import { defaultSearchBy, defaultSortBy, sortFnFabric } from './search.config';

export const actionTypes = {
  SET_QUERY: 'SET_QUERY',
  SET_RESULTS: 'SET_RESULTS',
  CLEAR_RESULTS: 'CLEAR_RESULTS',
  SET_SEARCH_BY: 'SET_SEARCH_BY',
  SET_SORT_BY: 'SET_SORT_BY',
  SET_IS_LOADING: 'SET_IS_LOADING',
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

export const setSearchBy = searchBy => ({
  type: actionTypes.SET_SEARCH_BY,
  searchBy,
});

export const setSortBy = sortBy => ({
  type: actionTypes.SET_SORT_BY,
  sortBy,
});

export const setIsLoading = isLoading => ({
  type: actionTypes.SET_IS_LOADING,
  isLoading,
});

export const search = (query, searchBy = defaultSearchBy, sortBy = defaultSortBy) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.get('/api', { params: { [searchBy]: query } })
    .then((res) => {
      dispatch(setResults(res.data, sortBy));
      dispatch(setIsLoading(false));
    })
    .catch(() => {
      dispatch(clearResults());
      dispatch(setIsLoading(false));
    });
};
