import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getNowPlayingMovies, Movie } from '../api/api';

type NowPlayingMovies = {
    nowPlayingMovies: Movie[] | null;
    loading: boolean;
    error: string | null;
};

const initialState: NowPlayingMovies = {
    nowPlayingMovies: null,
    loading: false,
    error: null,
};

export const loadNowPlayingMovies = createAsyncThunk(
    'now/loadNowPlayingMovies',
    async (page?: number) => {
        return await getNowPlayingMovies(page ?? 1);
    }
);

const nowPlayingSlice = createSlice({
    name: 'now',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadNowPlayingMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadNowPlayingMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.nowPlayingMovies = action.payload;
            })
            .addCase(loadNowPlayingMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки фильма';
            });
    },
});

export default nowPlayingSlice.reducer;
