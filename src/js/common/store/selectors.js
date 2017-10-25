import { createSelector } from 'reselect';

const commonStateSelector = state => state.common;

export const querySelector = createSelector(
  commonStateSelector,
  ({ query }) => query,
);

export const resultsSelector = createSelector(
  commonStateSelector,
  ({ results }) => results,
);

export const searchBySelector = createSelector(
  commonStateSelector,
  ({ searchBy }) => searchBy,
);

export const sortBySelector = createSelector(
  commonStateSelector,
  ({ sortBy }) => sortBy,
);

export const searchByParamsSelector = createSelector(
  commonStateSelector,
  ({ searchByParams }) => searchByParams,
);

export const sortByParamsSelector = createSelector(
  commonStateSelector,
  ({ sortByParams }) => sortByParams,
);

export const isLoadingSelector = createSelector(
  commonStateSelector,
  ({ isLoading }) => isLoading,
);

export const isFilmLoadingSelector = createSelector(
  commonStateSelector,
  ({ isFilmLoading }) => isFilmLoading,
);

const paramsTitleSelector = (state, props) => decodeURIComponent(props.match.params.title);

export const filmSelector = createSelector(
  [resultsSelector, paramsTitleSelector],
  (results, title) =>
    results && title && results.filter(item => item.title === title)[0],
);

export const filteredResultsSelector = createSelector(
  [resultsSelector, paramsTitleSelector],
  (results, title) =>
    results && title && results.filter(item => item.title !== title),
);
