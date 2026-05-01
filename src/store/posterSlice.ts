import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getPopularMovies, Movie } from '../api/api';

type PosterState = {
    movie: Movie | null;
    loading: boolean;
    error: string | null;
};

const initialState: PosterState = {
    movie: null,
    loading: false,
    error: null,
};

export const loadRandomPosterMovie = createAsyncThunk('poster/loadRandomHeroMovie', async () => {
    
        const movies = await getPopularMovies(1);
        const moviesWithBackdrop = movies.filter((movie) => movie.backdrop_path);
        const randomIndex = Math.floor(Math.random() * moviesWithBackdrop.length);
        const randomMovie = moviesWithBackdrop[randomIndex];

        if (!randomMovie) {
            throw new Error('Фильмы с backdrop_path не найдены');
        }

        return randomMovie;
    }
);

const posterSlice = createSlice({
    name: 'poster',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadRandomPosterMovie.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadRandomPosterMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.movie = action.payload;
            })
            .addCase(loadRandomPosterMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки фильма';
            });
    },
});

export default posterSlice.reducer;
