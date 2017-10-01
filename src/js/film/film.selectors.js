import { createSelector } from 'reselect';
import { selectors as searchSelectors } from '../search';

const subStateSelector = state => state.film;

export const filmSelector = createSelector(
  subStateSelector,
  ({ film }) => film,
);

export const filteredResultsSelector = createSelector(
  [searchSelectors.resultsSelector, filmSelector],
  (results, film) => results.filter(item => item.show_title !== film.title),
);
