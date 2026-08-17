import { configureStore } from '@reduxjs/toolkit';

import favoritesReducer from './favoritesSlice';
import filteredReducer from './filteredSlice';
import movieReducer from './movieSlice';
import moviesReducer from './moviesSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        movie: movieReducer,
        search: searchReducer,
        favorites: favoritesReducer,
        filtered: filteredReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
