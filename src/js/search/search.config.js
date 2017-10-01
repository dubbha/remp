export const searchByParams = ['title', 'director'];
export const sortByParams = ['release date', 'rating'];

export const defaultSearchBy = searchByParams[0];
export const defaultSortBy = sortByParams[0];

const sortByApiMap = {
  'release date': 'release_year',
  rating: 'rating',
};

export const sortFnFabric = sortBy => (a, b) => b[sortByApiMap[sortBy]] - a[sortByApiMap[sortBy]];
