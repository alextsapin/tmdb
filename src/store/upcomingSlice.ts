import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUpcomingMovies, Movie } from '../api/api';

type UpcomingMovies = {
    upcomingMovies: Movie[] | null;
    loading: boolean;
    error: string | null;
};

const initialState: UpcomingMovies = {
    upcomingMovies: null,
    loading: false,
    error: null,
};

export const loadUpcomingMovies = createAsyncThunk(
    'upcoming/loadUpcomingMovies',
    async (page?: number) => {
        return await getUpcomingMovies(page ?? 1);
    }
);

const upcomingSlice = createSlice({
    name: 'upcoming',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadUpcomingMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadUpcomingMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.upcomingMovies = action.payload;
            })
            .addCase(loadUpcomingMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки фильма';
            });
    },
});

export default upcomingSlice.reducer;
