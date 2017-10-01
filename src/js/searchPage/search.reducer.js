import { actionTypes } from './search.actions';

const searchByParams = ['title', 'director'];
const sortByParams = ['release date', 'rating'];

const defaultSearchBy = searchByParams[1];
const defaultSortBy = sortByParams[0];

const initialState = {
  query: '',
  results: [],
  searchByParams,
  sortByParams,
  searchBy: defaultSearchBy,
  sortBy: defaultSortBy,
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
    default:
      return state;
  }
};

export default searchReducer;

