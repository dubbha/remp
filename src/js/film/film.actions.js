import axios from 'axios';
import { apiUrl, apiKey } from '../common/config/api.config';
import * as searchActions from '../search/search.actions';

export const actionTypes = {
  SET_IS_LOADING: 'SET_IS_LOADING',
};

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
        return axios.get(`${apiUrl}movie/${film.id}`,
          {
            params: {
              query,
              api_key: apiKey,
              append_to_response: 'credits',
            },
          })
          .then((res2) => {
            dispatch(setIsLoading(false)); // film is ready to be displayed without extra details

            if (res2.data && res2.data.credits) {
              const runtime = res2.data.runtime;
              const cast = res2.data.credits.cast;

              const directorArr = res2.data.credits.crew.filter(i => i.job === 'Director');

              if (directorArr.length) {
                const director = directorArr[0].name;
                dispatch(searchActions.searchByDirector(director))
                  .then(() => {
                    dispatch(searchActions.setResultDetails(film.id, { runtime, cast, director }));
                  });
              } else { // no director to search by, this film is the only film in the list
                dispatch(searchActions.setResults([film]));
                dispatch(searchActions.setResultDetails(film.id, { runtime, cast }));
              }
            }
          });
      }
      return Promise.reject(res);
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

            dispatch(searchActions.searchByDirector(director))
              .then(() => {
                dispatch(searchActions.setResultDetails(film.id, { runtime, cast, director }));
              });
          }
        } else {
          dispatch(searchActions.setResultDetails(film.id, { runtime, cast }));
        }
      }
    });
