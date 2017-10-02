import { createSelector } from 'reselect';

const searchStateSelector = state => state.search;

export const querySelector = createSelector(
  searchStateSelector,
  ({ query }) => query,
);

export const resultsSelector = createSelector(
  searchStateSelector,
  ({ results }) => results,
);

export const searchBySelector = createSelector(
  searchStateSelector,
  ({ searchBy }) => searchBy,
);

export const sortBySelector = createSelector(
  searchStateSelector,
  ({ sortBy }) => sortBy,
);

export const searchByParamsSelector = createSelector(
  searchStateSelector,
  ({ searchByParams }) => searchByParams,
);

export const sortByParamsSelector = createSelector(
  searchStateSelector,
  ({ sortByParams }) => sortByParams,
);

export const isLoadingSelector = createSelector(
  searchStateSelector,
  ({ isLoading }) => isLoading,
);
