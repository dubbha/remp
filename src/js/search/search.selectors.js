import { createSelector } from 'reselect';

const subStateSelector = state => state.search;

export const querySelector = createSelector(
  subStateSelector,
  ({ query }) => query,
);

export const resultsSelector = createSelector(
  subStateSelector,
  ({ results }) => results,
);

export const searchBySelector = createSelector(
  subStateSelector,
  ({ searchBy }) => searchBy,
);

export const sortBySelector = createSelector(
  subStateSelector,
  ({ sortBy }) => sortBy,
);

export const searchByParamsSelector = createSelector(
  subStateSelector,
  ({ searchByParams }) => searchByParams,
);

export const sortByParamsSelector = createSelector(
  subStateSelector,
  ({ sortByParams }) => sortByParams,
);

export const isLoadingSelector = createSelector(
  subStateSelector,
  ({ isLoading }) => isLoading,
);
