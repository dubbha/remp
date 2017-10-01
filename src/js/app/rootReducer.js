import { combineReducers } from 'redux';
import search from '../search/search.reducer';
import film from '../film/film.reducer';

export default combineReducers({
  search,
  film,
});
