/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
    Actor,
    getMovieById,
    getMovieCast,
    getSimilarMovies,
    Movie,
    MovieDetails,
} from '@/entities/movie';

type MovieState = {
    movie: MovieDetails | null;
    cast: Actor[];
    similar: Movie[];
    loading: {
        movie: boolean;
        cast: boolean;
        similar: boolean;
    };
    error: {
        movie: string | null;
        cast: string | null;
        similar: string | null;
    };
};

const initialState: MovieState = {
    movie: null,
    cast: [],
    similar: [],
    loading: {
        movie: false,
        cast: false,
        similar: false,
    },
    error: {
        movie: null,
        cast: null,
        similar: null,
    },
};

export const loadMovieById = createAsyncThunk('movie/loadMovie', async (id: number) => {
    return getMovieById(id);
});

export const loadMovieCast = createAsyncThunk('movie/loadMovieCast', async (id: number) => {
    return getMovieCast(id);
});

export const loadSimilarMovies = createAsyncThunk('movie/loadSimilarMovies', async (id: number) => {
    return getSimilarMovies(id);
});

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        clearErrors: state => {
            state.error.movie = null;
            state.error.cast = null;
            state.error.similar = null;
        },
    },
    extraReducers: builder => {
        // Movie
        builder.addCase(loadMovieById.pending, state => {
            state.loading.movie = true;
            state.error.movie = null;
        });

        builder.addCase(loadMovieById.fulfilled, (state, action) => {
            state.movie = action.payload;
            state.loading.movie = false;
        });

        builder.addCase(loadMovieById.rejected, (state, action) => {
            state.loading.movie = false;
            state.error.movie = action.error.message || null;
        });

        // Cast
        builder.addCase(loadMovieCast.pending, state => {
            state.loading.cast = true;
            state.error.cast = null;
        });

        builder.addCase(loadMovieCast.fulfilled, (state, action) => {
            state.cast = action.payload;
            state.loading.cast = false;
        });

        builder.addCase(loadMovieCast.rejected, (state, action) => {
            state.loading.cast = false;
            state.error.cast = action.error.message || null;
        });

        // Similar
        builder.addCase(loadSimilarMovies.pending, state => {
            state.loading.similar = true;
            state.error.similar = null;
        });

        builder.addCase(loadSimilarMovies.fulfilled, (state, action) => {
            state.similar = action.payload;
            state.loading.similar = false;
        });

        builder.addCase(loadSimilarMovies.rejected, (state, action) => {
            state.loading.similar = false;
            state.error.similar = action.error.message || null;
        });
    },
});

export const { clearErrors } = movieSlice.actions;
export default movieSlice.reducer;
