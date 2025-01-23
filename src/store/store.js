import {configureStore} from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import persistedReducer from './moviesSlice';
import {persistStore} from 'redux-persist';

const store = configureStore({
  reducer: {
    movies: persistedReducer,
  },
});
const persistor = persistStore(store);

export default store;
export {persistor};
