export const actionTypes = {
  SET_FILM: 'SET_FILM',
};

export const setFilm = film => ({
  type: actionTypes.SET_FILM,
  film,
});
