import { actionTypes } from './film.actions';

const initialState = {
  film: null,
};

const filmReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FILM:
      return {
        ...state,
        film: action.film,
      };
    default:
      return state;
  }
};

export default filmReducer;
