import axios from 'axios';
import * as searchActions from '../search/search.actions';

export const actionTypes = {
  SET_FILM: 'SET_FILM',
  SET_IS_LOADING: 'SET_IS_LOADING',
};

export const setFilm = film => ({
  type: actionTypes.SET_FILM,
  film,
});

export const setIsLoading = isLoading => ({
  type: actionTypes.SET_IS_LOADING,
  isLoading,
});

export const getFilm = query => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.get('/api', { params: { title: query } })
    .then((res) => {
      dispatch(setFilm(res.data));
      dispatch(setIsLoading(false));
      dispatch(searchActions.search(res.data.director.split(',')[0], 'director'));
    })
    .catch(() => {
      dispatch(setIsLoading(false));
    });
};
