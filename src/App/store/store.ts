import { configureStore } from '@reduxjs/toolkit';

import { movieReducer, moviesReducer } from '@/entities/movie';
import { filteredReducer } from '@/features/filter';
import { favoritesReducer } from '@/features/like';
import { searchReducer } from '@/features/search';
import { themeReducer } from '@/features/theme';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        movie: movieReducer,
        search: searchReducer,
        favorites: favoritesReducer,
        filtered: filteredReducer,
        theme: themeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
