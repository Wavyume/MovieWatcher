import {createSlice} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage/session';
import {persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'movies',
  storage,
  whitelist: ['movies'],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: {},
    loading: false,
  },
  reducers: {
    setMultipleMoviesBasicInfo: (state, action) => {
      const moviesData = action.payload;
      moviesData.forEach(({id, movieData}) => {
        state.movies[id] = {
          ...state.movies[id],
          ...movieData,
        };
      });
    },

    setMovieBasicInfo: (state, action) => {
      const {id, movieData} = action.payload;
      state.movies[id] = {
        ...state.movies[id],
        ...movieData,
      };
    },
    setMovieFullInfo: (state, action) => {
      const {id, fullData} = action.payload;
      state.movies[id] = {
        ...state.movies[id],
        ...fullData,
        hasBasicInfo: false,
        hasFullInfo: true,
      };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setMultipleMoviesBasicInfo,
  setMovieBasicInfo,
  setMovieFullInfo,
  setLoading,
} = moviesSlice.actions;

const persistedReducer = persistReducer(persistConfig, moviesSlice.reducer);
export default persistedReducer;
