import axios from 'axios';
import { apiUrl, apiKey } from '../common/config/api.config';
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

  return axios.get(`${apiUrl}search/movie`,
    {
      params: {
        query,
        api_key: apiKey,
      },
    })
    .then((res) => {
      if (res.data && res.data.results && res.data.results.length) {
        const film = res.data.results[0];
        axios.get(`${apiUrl}movie/${film.id}`,
          {
            params: {
              query,
              api_key: apiKey,
              append_to_response: 'credits',
            },
          })
          .then((res2) => {
            if (res2.data && res2.data.credits && res2.data.credits.crew) {
              const directorArr = res2.data.credits.crew.filter(i => i.job === 'Director');

              if (directorArr.length) { // some movies have no director
                film.director = directorArr[0].name;
              }

              film.runtime = res2.data.runtime;
              film.cast = res2.data.credits.cast;

              dispatch(setFilm(film));
              dispatch(setIsLoading(false));

              if (film.director) {
                dispatch(searchActions.searchByDirector(film.director));
              }

              dispatch(searchActions.setResultDetails(film.id, { film }));
            }
          });
      }
    });
};

export const getFilmDetails = film => dispatch =>
  axios.get(`${apiUrl}movie/${film.id}`,
    {
      params: {
        api_key: apiKey,
        append_to_response: 'credits',
      },
    })
    .then((res) => {
      if (res.data && res.data) {
        const runtime = res.data.runtime;
        const cast = res.data.credits.cast;

        if (!film.director) {
          const directorArr = res.data.credits.crew.filter(i => i.job === 'Director');

          if (directorArr.length) { // some movies have no director
            const director = directorArr[0].name;

            dispatch(setFilm({ ...film, runtime, cast, director }));

            dispatch(searchActions.searchByDirector(director));
            dispatch(searchActions.setResultDetails(film.id, { runtime, cast, director }));
          }
        } else {
          dispatch(setFilm({ ...film, runtime, cast }));
          dispatch(searchActions.setResultDetails(film.id, { runtime, cast }));
        }
      }
    });

export const selectFilm = film => (dispatch) => {
  dispatch(setFilm(film)); // display available data

  if (!film.runtime || !film.cast || !film.director) {
    dispatch(getFilmDetails(film)); // fetch additional data
  }
};
