import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getPopularMovies, Movie } from '../api/api';

type PopMovies = {
    popMovies: Movie[];
    loading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
};

const initialState: PopMovies = {
    popMovies: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
};

export const loadPopularMovies = createAsyncThunk(
    'pop/loadPopularMovies',
    async (page?: number) => {
        return await getPopularMovies(page ?? 1);
    }
);

const popSlice = createSlice({
    name: 'pop',
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
                state.popMovies = action.payload.results;
                state.page = action.payload.page;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(loadPopularMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки фильмов';
            });
    },
});

export default popSlice.reducer;
