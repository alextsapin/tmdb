import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getPopularMovies, Movie } from '../api/api';

type PopMovies = {
    movies: Movie[] | null;
    loading: boolean;
    error: string | null;
};

const initialState: PopMovies = {
    movies: null,
    loading: false,
    error: null,
};

export const loadPopularMovies = createAsyncThunk('poster/loadPopulatMovies', async () => {
    
        const movies = await getPopularMovies(1);
        const sixMovies = [];

        for (let i = 0; i < 6; i++) {
            sixMovies.push(movies[i])
        }

        return sixMovies;
    }
);

const popSlice = createSlice({
    name: 'poster',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadPopularMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadPopularMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(loadPopularMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки фильма';
            });
    },
});

export default popSlice.reducer;
