import axios from 'axios';
import { apiUrl, apiKey } from '../common/config/api.config';
import { defaultSortBy, sortFnFabric } from './search.config';

export const actionTypes = {
  SET_QUERY: 'SET_QUERY',
  SET_RESULTS: 'SET_RESULTS',
  CLEAR_RESULTS: 'CLEAR_RESULTS',
  SET_RESULT_DETAILS: 'SET_RESULT_DETAILS',
  SET_SEARCH_BY: 'SET_SEARCH_BY',
  SET_SORT_BY: 'SET_SORT_BY',
  SET_IS_LOADING: 'SET_IS_LOADING',
};

export const setQuery = query => ({
  type: actionTypes.SET_QUERY,
  query,
});

export const setResults = (results, sortBy = defaultSortBy) => ({
  type: actionTypes.SET_RESULTS,
  results: Array.isArray(results) ? results.sort(sortFnFabric(sortBy)) : [results],
});

export const clearResults = () => ({
  type: actionTypes.CLEAR_RESULTS,
});

export const setResultDetails = (id, details) => ({
  type: actionTypes.SET_RESULT_DETAILS,
  id,
  details,
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

export const searchByDirector = (query, sortBy = defaultSortBy) => (dispatch) => {
  dispatch(setIsLoading(true));

  return axios.get(`${apiUrl}search/person`,
    {
      params: {
        query,
        api_key: apiKey,
      },
    })
    .then((res) => {
      if (res.data && res.data.results && res.data.results.length) {
        return axios.get(`${apiUrl}person/${res.data.results[0].id}`,
          {
            params: {
              append_to_response: 'movie_credits',
              api_key: apiKey,
            },
          })
          .then((res2) => {
            if (res2.data && res2.data.movie_credits && res2.data.movie_credits.crew) {
              const films = res2.data.movie_credits.crew
                .filter(i => i.job === 'Director')
                .filter(i => !!i.title && !!i.release_date && !!i.poster_path)
                .map(i => ({ ...i, director: query }));

              dispatch(setIsLoading(false));
              dispatch(setResults(films, sortBy));
            }
          });
      }
      return Promise.reject(res);
    })
    .catch(() => {
      dispatch(clearResults());
      dispatch(setIsLoading(false));
    });
};

export const searchByTitle = (query, sortBy = defaultSortBy) => (dispatch) => {
  dispatch(setIsLoading(true));

  return axios.get(`${apiUrl}search/movie`,
    {
      params: {
        query,
        api_key: apiKey,
      },
    })
    .then((res) => {
      if (res.data && res.data.results) {
        const films = res.data.results
          .filter(i => !!i.title && !!i.release_date && !!i.poster_path);
        dispatch(setResults(films, sortBy));
        dispatch(setIsLoading(false));
      }
    })
    .catch(() => {
      dispatch(clearResults());
      dispatch(setIsLoading(false));
    });
};
