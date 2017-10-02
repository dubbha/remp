import { actionTypes } from './film.actions';

const initialState = {
  film: null,
  isLoading: false,
};

const filmReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FILM:
      return {
        ...state,
        film: action.film,
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

export default filmReducer;
