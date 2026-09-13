import { configureStore } from '@reduxjs/toolkit';

import favoritesReducer from '@/store/favoritesSlice';
import filteredReducer from '@/store/filteredSlice';
import movieReducer from '@/store/movieSlice';
import moviesReducer from '@/store/moviesSlice';
import searchReducer from '@/store/searchSlice';
import themeReducer from '@/store/themeSlice';

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
