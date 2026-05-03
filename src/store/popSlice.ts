import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getPopularMovies, Movie } from '../api/api';


type PopMovies = {
    popMovies: Movie[] | null;
    loading: boolean;
    error: string | null;
};

const initialState: PopMovies = {
    popMovies: null,
    loading: false,
    error: null,
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
                state.popMovies = action.payload;
            })
            .addCase(loadPopularMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки фильма';
            });
    },
});

export default popSlice.reducer;
