import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import searchReducer from './searchSlice';
import movieReducer from './movieSlice';
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        movie: movieReducer,
        search: searchReducer,
        favorites: favoritesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
