import { createSelector } from 'reselect';
import * as searchSelectors from '../search/search.selectors';

const filmStateSelector = state => state.film;

export const filmSelector = createSelector(
  filmStateSelector,
  ({ film }) => film,
);

export const isLoadingSelector = createSelector(
  filmStateSelector,
  ({ isLoading }) => isLoading,
);

export const filteredResultsSelector = createSelector(
  [searchSelectors.resultsSelector, filmSelector],
  (results, film) =>
    results && film && results.filter(item => item.show_title !== film.show_title),
);
