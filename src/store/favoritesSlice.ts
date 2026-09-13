import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Movie } from '@/api/api';

const loadFavorites = (): Movie[] => {
    const data = localStorage.getItem('favorites');

    if (!data) return [];

    return JSON.parse(data);
};

type FavoritesState = {
    movies: Movie[];
};

const initialState: FavoritesState = {
    movies: loadFavorites(),
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Movie>) => {
            state.movies.push(action.payload);
            localStorage.setItem('favorites', JSON.stringify(state.movies));
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.movies = state.movies.filter(movie => movie.id !== action.payload);
            localStorage.setItem('favorites', JSON.stringify(state.movies));
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
