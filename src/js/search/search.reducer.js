import { actionTypes } from './search.actions';
import { searchByParams, sortByParams, defaultSearchBy, defaultSortBy } from './search.config';

const initialState = {
  query: '',
  results: [],
  searchByParams,
  sortByParams,
  searchBy: defaultSearchBy,
  sortBy: defaultSortBy,
  isLoading: false,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_QUERY:
      return {
        ...state,
        query: action.query,
      };
    case actionTypes.SET_RESULTS:
      return {
        ...state,
        results: action.results,
      };
    case actionTypes.CLEAR_RESULTS:
      return {
        ...state,
        results: [],
      };
    case actionTypes.SET_SEARCH_BY:
      return {
        ...state,
        searchBy: action.searchBy,
      };
    case actionTypes.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.sortBy,
      };
    case actionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export default searchReducer;

