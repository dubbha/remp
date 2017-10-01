import { createSelector } from 'reselect';

export const searchSelector = state => state.search;

export const querySelector = createSelector(
  searchSelector,
  ({ query }) => query,
);

export const resultsSelector = createSelector(
  searchSelector,
  ({ results }) => results,
);

export const searchBySelector = createSelector(
  searchSelector,
  ({ searchBy }) => searchBy,
);

export const sortBySelector = createSelector(
  searchSelector,
  ({ sortBy }) => sortBy,
);

export const searchByParamsSelector = createSelector(
  searchSelector,
  ({ searchByParams }) => searchByParams,
);

export const sortByParamsSelector = createSelector(
  searchSelector,
  ({ sortByParams }) => sortByParams,
);
