import { createSelector } from 'reselect';
import * as searchSelectors from '../search/search.selectors';

const filmStateSelector = state => state.film;

export const isLoadingSelector = createSelector(
  filmStateSelector,
  ({ isLoading }) => isLoading,
);

export const titleSelector = (state, props) => decodeURIComponent(props.match.params.title);

export const filmSelector = createSelector(
  [searchSelectors.resultsSelector, titleSelector],
  (results, title) =>
    results && title && results.filter(item => item.title === title)[0],
);

export const filteredResultsSelector = createSelector(
  [searchSelectors.resultsSelector, titleSelector],
  (results, title) =>
    results && title && results.filter(item => item.title !== title),
);
