import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getTopMovies, Movie } from '../api/api';

type TopMovies = {
    topMovies: Movie[] | null;
    loading: boolean;
    error: string | null;
};

const initialState: TopMovies = {
    topMovies: null,
    loading: false,
    error: null,
};

export const loadTopMovies = createAsyncThunk(
    'top/loadTopMovies',
    async (page?: number) => {
        return await getTopMovies(page ?? 1);
    }
);

const topSlice = createSlice({
    name: 'top',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadTopMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadTopMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.topMovies = action.payload;
            })
            .addCase(loadTopMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки фильма';
            });
    },
});

export default topSlice.reducer;
