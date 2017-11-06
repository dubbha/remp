import axios from 'axios';
import * as sut from 'common/store/actions';

jest.mock('common/store/store.config', () => ({
  defaultSortBy: 'id',
  sortFnFabric: sortBy => (a, b) => (b[sortBy] > a[sortBy] ? 1 : -1),
}));

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve()),
}));

jest.mock('common/config/api.config', () => ({
  apiUrl: 'https://API_URL/',
  apiKey: 'API_KEY',
}));


describe('actions', () => {
  let thunk;
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('setQuery action', () => {
    it('should set query', () => {
      expect(sut.setQuery('QUERY')).toEqual({
        type: sut.actionTypes.SET_QUERY,
        query: 'QUERY',
      });
    });
  });

  describe('setResults action', () => {
    it('should set results with default sorting', () => {
      expect(sut.setResults([{ id: 1 }, { id: 3 }, { id: 2 }])).toEqual({
        type: sut.actionTypes.SET_RESULTS,
        results: [{ id: 3 }, { id: 2 }, { id: 1 }],
      });
    });

    it('should sort results by the passed prop instead if available', () => {
      expect(sut.setResults([{ id: 1, title: 'b' }, { id: 3, title: 'c' }, { id: 2, title: 'a' }], 'title'))
        .toEqual({
          type: sut.actionTypes.SET_RESULTS,
          results: [{ id: 3, title: 'c' }, { id: 1, title: 'b' }, { id: 2, title: 'a' }],
        });
    });

    it('should wrap to an array if a single result was passed', () => {
      expect(sut.setResults({ id: 2 })).toEqual({
        type: sut.actionTypes.SET_RESULTS,
        results: [{ id: 2 }],
      });
    });
  });

  describe('clearResults action', () => {
    it('should clear resuts', () => {
      expect(sut.clearResults()).toEqual({
        type: sut.actionTypes.CLEAR_RESULTS,
      });
    });
  });

  describe('setResultDetails action', () => {
    it('should details for a specific result', () => {
      expect(sut.setResultDetails(2, { title: 'NEW_TITLE' })).toEqual({
        type: sut.actionTypes.SET_RESULT_DETAILS,
        id: 2,
        details: { title: 'NEW_TITLE' },
      });
    });
  });

  describe('setResultDetails action', () => {
    it('should details for a specific result', () => {
      expect(sut.setResultDetails(2, { title: 'NEW_TITLE' })).toEqual({
        type: sut.actionTypes.SET_RESULT_DETAILS,
        id: 2,
        details: { title: 'NEW_TITLE' },
      });
    });
  });

  describe('setSearchBy action', () => {
    it('should set setSearchBy parameter', () => {
      expect(sut.setSearchBy('SEARCH_BY_PARAM')).toEqual({
        type: sut.actionTypes.SET_SEARCH_BY,
        searchBy: 'SEARCH_BY_PARAM',
      });
    });
  });

  describe('setSortBy action', () => {
    it('should set setSortBy parameter', () => {
      expect(sut.setSortBy('SORT_BY_PARAM')).toEqual({
        type: sut.actionTypes.SET_SORT_BY,
        sortBy: 'SORT_BY_PARAM',
      });
    });
  });

  describe('setIsLoading action', () => {
    it('should set setIsLoading parameter', () => {
      expect(sut.setIsLoading(true)).toEqual({
        type: sut.actionTypes.SET_IS_LOADING,
        isLoading: true,
      });
    });
  });

  describe('setIsFilmLoading action', () => {
    it('should set setIsFilmLoading parameter', () => {
      expect(sut.setIsFilmLoading(true)).toEqual({
        type: sut.actionTypes.SET_IS_FILM_LOADING,
        isFilmLoading: true,
      });
    });
  });

  describe('searchByDirector action', () => {
    beforeEach(() => {
      thunk = sut.searchByDirector('QUERY');
    });

    it('should raise isLoading flag', () => {
      thunk(dispatch);

      expect(dispatch).toBeCalledWith({
        type: sut.actionTypes.SET_IS_LOADING,
        isLoading: true,
      });
    });

    it('should search person by query', () => {
      thunk(dispatch);

      expect(axios.get).toBeCalledWith('https://API_URL/search/person', {
        params: {
          query: 'QUERY',
          api_key: 'API_KEY',
        },
      });
    });

    it('should request crew movie credits by the first person id', () => {
      axios.get.mockReturnValueOnce(
        Promise.resolve({
          data: {
            results: [{ id: 123 }],
          },
        }));

      return thunk(dispatch).then(() =>
        expect(axios.get).toBeCalledWith('https://API_URL/person/123', {
          params: {
            append_to_response: 'movie_credits',
            api_key: 'API_KEY',
          },
        }),
      );
    });

    it('should reset isLoading flag after receiving crew movie credits', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              results: [{ id: 123 }],
            },
          }))
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              movie_credits: {
                crew: [],
              },
            },
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.SET_IS_LOADING,
            isLoading: false,
          }),
        );
    });

    it('should reset isLoading flag after receiving crew movie credits', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              results: [{ id: 123 }],
            },
          }))
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              movie_credits: {
                crew: [
                  { job: 'Director', title: 'TITLE1', release_date: '2001/01/01', poster_path: 'POSTER1' },
                  { job: 'Actor', title: 'TITLE2', release_date: '2002/02/02', poster_path: 'POSTER2' },
                  { job: 'Director', title: 'TITLE3', release_date: '2003/03/03', poster_path: 'POSTER3' },
                ],
              },
            },
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.SET_RESULTS,
            results: [
              {
                job: 'Director',
                title: 'TITLE1',
                release_date: '2001/01/01',
                poster_path: 'POSTER1',
                director: 'QUERY',
              },
              {
                job: 'Director',
                title: 'TITLE3',
                release_date: '2003/03/03',
                poster_path: 'POSTER3',
                director: 'QUERY',
              },
            ],
          }),
        );
    });

    it('should clear results if person was not found', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              results: [],
            },
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.CLEAR_RESULTS,
          }),
        );
    });

    it('should reset isLoading flag if person was not found', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              results: [],
            },
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.SET_IS_LOADING,
            isLoading: false,
          }),
        );
    });

    it('should clear results if person was found but crew movie credits are not available', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              results: [{ id: 123 }],
            },
          }))
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              movie_credits: {},
            },
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.CLEAR_RESULTS,
          }),
        );
    });

    it('should reset isLoading flag if person was found but crew movie credits are not available', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              results: [{ id: 123 }],
            },
          }))
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              movie_credits: {},
            },
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.SET_IS_LOADING,
            isLoading: false,
          }),
        );
    });

    it('should clear results on server error', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.reject({
            status: 500,
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.CLEAR_RESULTS,
          }),
        );
    });

    it('should reset isLoading flag on server error', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.reject({
            status: 500,
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.SET_IS_LOADING,
            isLoading: false,
          }),
        );
    });

    it('should clear results on the secord request server error', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              results: [{ id: 123 }],
            },
          }))
        .mockReturnValueOnce(
          Promise.reject({
            status: 500,
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.CLEAR_RESULTS,
          }),
        );
    });

    it('should reset isLoading flag on server error', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              results: [{ id: 123 }],
            },
          }))
        .mockReturnValueOnce(
          Promise.reject({
            status: 500,
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.SET_IS_LOADING,
            isLoading: false,
          }),
        );
    });
  });

  describe('searchByTitle action', () => {
    beforeEach(() => {
      thunk = sut.searchByTitle('QUERY');
    });

    it('should raise isLoading flag', () => {
      thunk(dispatch);

      expect(dispatch).toBeCalledWith({
        type: sut.actionTypes.SET_IS_LOADING,
        isLoading: true,
      });
    });

    it('should search movie by query', () => {
      thunk(dispatch);

      expect(axios.get).toBeCalledWith('https://API_URL/search/movie', {
        params: {
          query: 'QUERY',
          api_key: 'API_KEY',
        },
      });
    });

    it('should clear results if movie was not found', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              results: [],
            },
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.CLEAR_RESULTS,
          }),
        );
    });

    it('should reset isLoading flag if movie was not found', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              results: [],
            },
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.SET_IS_LOADING,
            isLoading: false,
          }),
        );
    });

    it('should reset isLoading flag if movies were found', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              results: [
                { id: 1, title: 'TITLE1', release_date: '2001/01/01', poster_path: 'POSTER1' },
                { id: 2, title: 'TITLE2', release_date: '2002/01/01', poster_path: 'POSTER2' },
                { id: 3, title: 'TITLE3', release_date: '2003/01/01', poster_path: '' },
              ],
            },
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.SET_IS_LOADING,
            isLoading: false,
          }),
        );
    });

    it('should set results with default sorting if movies were found', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              results: [
                { id: 1, title: 'TITLE1', release_date: '2001/01/01', poster_path: 'POSTER1' },
                { id: 2, title: 'TITLE2', release_date: '2002/01/01', poster_path: 'POSTER2' },
                { id: 3, title: 'TITLE3', release_date: '2003/01/01', poster_path: 'POSTER3' },
              ],
            },
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.SET_RESULTS,
            results: [
              { id: 3, title: 'TITLE3', release_date: '2003/01/01', poster_path: 'POSTER3' },
              { id: 2, title: 'TITLE2', release_date: '2002/01/01', poster_path: 'POSTER2' },
              { id: 1, title: 'TITLE1', release_date: '2001/01/01', poster_path: 'POSTER1' },
            ],
          }),
        );
    });

    it('should filter out results missing required data', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              results: [
                { id: 1, title: 'TITLE1', release_date: '2001/01/01', poster_path: 'POSTER1' },
                { id: 2, title: 'TITLE2', release_date: '2002/01/01', poster_path: 'POSTER2' },
                { id: 3, title: 'TITLE3', release_date: '2003/01/01', poster_path: '' },
              ],
            },
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.SET_RESULTS,
            results: [
              { id: 2, title: 'TITLE2', release_date: '2002/01/01', poster_path: 'POSTER2' },
              { id: 1, title: 'TITLE1', release_date: '2001/01/01', poster_path: 'POSTER1' },
            ],
          }),
        );
    });

    it('should set results with non-default sorting if passed', () => {
      thunk = sut.searchByTitle('QUERY', 'title');

      axios.get
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              results: [
                { id: 1, title: 'B', release_date: '2001/01/01', poster_path: 'POSTER1' },
                { id: 2, title: 'A', release_date: '2002/01/01', poster_path: 'POSTER2' },
                { id: 3, title: 'C', release_date: '2003/01/01', poster_path: 'POSTER3' },
              ],
            },
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.SET_RESULTS,
            results: [
              { id: 3, title: 'C', release_date: '2003/01/01', poster_path: 'POSTER3' },
              { id: 1, title: 'B', release_date: '2001/01/01', poster_path: 'POSTER1' },
              { id: 2, title: 'A', release_date: '2002/01/01', poster_path: 'POSTER2' },
            ],
          }),
        );
    });

    it('should clear results on server error', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.reject({
            status: 500,
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.CLEAR_RESULTS,
          }),
        );
    });

    it('should reset isLoading flag on server error', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.reject({
            status: 500,
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.SET_IS_LOADING,
            isLoading: false,
          }),
        );
    });
  });

  describe('getFilm action', () => {
    beforeEach(() => {
      thunk = sut.getFilm(123);
    });

    it('should raise isLoading flag', () => {
      thunk(dispatch);

      expect(dispatch).toBeCalledWith({
        type: sut.actionTypes.SET_IS_LOADING,
        isLoading: true,
      });
    });

    it('should search movie by query', () => {
      thunk(dispatch);

      expect(axios.get).toBeCalledWith('https://API_URL/movie/123', {
        params: {
          api_key: 'API_KEY',
          append_to_response: 'credits',
        },
      });
    });

    it('should reset isLoading flag upon receiving the response', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              runtime: 120,
              credits: {
                cast: [],
                crew: [],
              },
            },
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.SET_IS_LOADING,
            isLoading: false,
          }),
        );
    });

    it('should set results to a single film with genre ids extracted if no director available', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              runtime: 120,
              credits: {
                cast: [],
                crew: [],
              },
              genres: [
                { id: 1, name: 'GENRE_NAME1' },
                { id: 2, name: 'GENRE_NAME2' },
                { id: 3, name: 'GENRE_NAME3' },
              ],
            },
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.SET_RESULTS,
            results: [{
              runtime: 120,
              credits: {
                cast: [],
                crew: [],
              },
              genres: [
                { id: 1, name: 'GENRE_NAME1' },
                { id: 2, name: 'GENRE_NAME2' },
                { id: 3, name: 'GENRE_NAME3' },
              ],
              cast: [],
              genre_ids: [1, 2, 3],
            }],
          }),
        );
    });

    it('should set results to a single film with genre ids extracted if no credits available', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              runtime: 120,
              genres: [
                { id: 1, name: 'GENRE_NAME1' },
                { id: 2, name: 'GENRE_NAME2' },
                { id: 3, name: 'GENRE_NAME3' },
              ],
            },
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.SET_RESULTS,
            results: [{
              runtime: 120,
              genres: [
                { id: 1, name: 'GENRE_NAME1' },
                { id: 2, name: 'GENRE_NAME2' },
                { id: 3, name: 'GENRE_NAME3' },
              ],
              cast: [],
              genre_ids: [1, 2, 3],
            }],
          }),
        );
    });

    it('should search for other films by the same director if director is available', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              runtime: 120,
              credits: {
                cast: [],
                crew: [
                  { job: 'Someguy', name: 'SOMEGUY_NAME' },
                  { job: 'Director', name: 'DIRECTOR_NAME' },
                ],
              },
              genres: [
                { id: 1, name: 'GENRE_NAME1' },
                { id: 2, name: 'GENRE_NAME2' },
                { id: 3, name: 'GENRE_NAME3' },
              ],
            },
          }));

      return thunk(dispatch)
        .then(() =>
          expect(axios.get).toBeCalledWith('https://API_URL/search/person', {
            params: {
              query: 'DIRECTOR_NAME',
              api_key: 'API_KEY',
            },
          }),
        );
    });

    it('should preserve extra film details by adding them to the results', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              runtime: 120,
              credits: {
                cast: [
                  { character: 'CHARACTER1', name: 'NAME1' },
                  { character: 'CHARACTER2', name: 'NAME2' },
                ],
                crew: [
                  { job: 'Someguy', name: 'SOMEGUY_NAME' },
                  { job: 'Director', name: 'DIRECTOR_NAME' },
                ],
              },
              genres: [
                { id: 1, name: 'GENRE_NAME1' },
                { id: 2, name: 'GENRE_NAME2' },
                { id: 3, name: 'GENRE_NAME3' },
              ],
            },
          }))
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              results: [{ id: 1 }],
            },
          }))
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              movie_credits: {
                crew: [],
              },
            },
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.SET_RESULT_DETAILS,
            id: 123,
            details: {
              runtime: 120,
              cast: [
                { character: 'CHARACTER1', name: 'NAME1' },
                { character: 'CHARACTER2', name: 'NAME2' },
              ],
              director: 'DIRECTOR_NAME',
            },
          }),
        );
    });

    it('should clear results if no data received', () => {
      axios.get.mockReturnValueOnce(Promise.resolve({}));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.CLEAR_RESULTS,
          }),
        );
    });

    it('should clear results on server error', () => {
      axios.get
        .mockReturnValueOnce(
          Promise.reject({
            status: 500,
          }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.CLEAR_RESULTS,
          }),
        );
    });
  });

  describe('getFilmDetails action', () => {
    beforeEach(() => {
      thunk = sut.getFilmDetails({
        id: 123,
        director: 'DIRECTOR',
      });
    });

    it('should search movie by id', () => {
      thunk(dispatch);

      expect(axios.get).toBeCalledWith('https://API_URL/movie/123', {
        params: {
          api_key: 'API_KEY',
          append_to_response: 'credits',
        },
      });
    });

    it('should update specific result with runtime and cast if director is already known', () => {
      axios.get.mockReturnValueOnce(
        Promise.resolve({
          data: {
            runtime: 120,
            credits: {
              cast: [{ id: 1 }],
            },
          },
        }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.SET_RESULT_DETAILS,
            id: 123,
            details: {
              runtime: 120,
              cast: [{ id: 1 }],
            },
          }),
        );
    });

    it('should search for other films of the same director after director is retrieved', () => {
      thunk = sut.getFilmDetails({
        id: 123,
      });

      axios.get.mockReturnValueOnce(
        Promise.resolve({
          data: {
            runtime: 120,
            credits: {
              cast: [
                { id: 1, name: 'ACTOR_NAME' },
                { id: 2, name: 'ACTRESS_NAME' },
              ],
              crew: [
                { job: 'Someguy', name: 'SOMEGUY_NAME' },
                { job: 'Director', name: 'DIRECTOR_NAME' },
              ],
            },
          },
        }));

      return thunk(dispatch)
        .then(() =>
          expect(axios.get).toBeCalledWith('https://API_URL/search/person', {
            params: {
              query: 'DIRECTOR_NAME',
              api_key: 'API_KEY',
            },
          }),
        );
    });

    it('should update specific result in the list with runtime, cast and director', () => {
      thunk = sut.getFilmDetails({
        id: 123,
      });

      axios.get
        .mockReturnValueOnce(
          Promise.resolve({
            data: {
              runtime: 120,
              credits: {
                cast: [
                  { id: 1, name: 'ACTOR_NAME' },
                  { id: 2, name: 'ACTRESS_NAME' },
                ],
                crew: [
                  { job: 'Someguy', name: 'SOMEGUY_NAME' },
                  { job: 'Director', name: 'DIRECTOR_NAME' },
                ],
              },
            },
          }))
        .mockReturnValueOnce(Promise.resolve());

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.SET_RESULT_DETAILS,
            id: 123,
            details: {
              runtime: 120,
              cast: [
                { id: 1, name: 'ACTOR_NAME' },
                { id: 2, name: 'ACTRESS_NAME' },
              ],
              director: 'DIRECTOR_NAME',
            },
          }),
        );
    });

    it('should update specific result with runtime and cast if no director retrieved', () => {
      thunk = sut.getFilmDetails({
        id: 123,
      });

      axios.get.mockReturnValueOnce(
        Promise.resolve({
          data: {
            runtime: 120,
            credits: {
              cast: [
                { id: 1, name: 'ACTOR_NAME' },
                { id: 2, name: 'ACTRESS_NAME' },
              ],
              crew: [
                { job: 'Someguy', name: 'SOMEGUY_NAME' },
              ],
            },
          },
        }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.SET_RESULT_DETAILS,
            id: 123,
            details: {
              runtime: 120,
              cast: [
                { id: 1, name: 'ACTOR_NAME' },
                { id: 2, name: 'ACTRESS_NAME' },
              ],
            },
          }),
        );
    });

    it('should update specific result with runtime and cast if no credits are available', () => {
      thunk = sut.getFilmDetails({
        id: 123,
      });

      axios.get.mockReturnValueOnce(
        Promise.resolve({
          data: {
            runtime: 120,
          },
        }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).toBeCalledWith({
            type: sut.actionTypes.SET_RESULT_DETAILS,
            id: 123,
            details: {
              runtime: 120,
              cast: [],
            },
          }),
        );
    });

    it('should fail silently on server error', () => {
      axios.get.mockReturnValueOnce(
        Promise.reject({
          status: 500,
        }));

      return thunk(dispatch)
        .then(() =>
          expect(dispatch).not.toBeCalled(),
        );
    });

    it('should fail silently on empty data received', () => {
      axios.get.mockReturnValueOnce(Promise.resolve({}));

      return thunk(dispatch)
        .catch(() =>
          expect(dispatch).not.toBeCalled(),
        );
    });
  });
});
