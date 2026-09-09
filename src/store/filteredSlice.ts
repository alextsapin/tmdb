/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { discoverMovies, Movie, MovieSort } from '../api/api';
import { RATING_MAX, RATING_MIN } from '../constants';

type FilteredState = {
    movies: Movie[];
    page: number;
    totalPages: number;
    sortBy: MovieSort;
    voteAverageGte: number;
    voteAverageLte: number;
    withGenres: number[];
    loading: boolean;
    error: string | null;
};

const initialState: FilteredState = {
    movies: [],
    page: 1,
    totalPages: 1,
    sortBy: 'popularity.desc',
    voteAverageGte: RATING_MIN,
    voteAverageLte: RATING_MAX,
    withGenres: [],
    loading: false,
    error: null,
};

type LoadFilteredMoviesArgs = {
    page?: number;
    sortBy: MovieSort;
    voteAverageGte: number;
    voteAverageLte: number;
    withGenres: number[];
};

export const loadFilteredMovies = createAsyncThunk(
    'filtered/loadFilteredMovies',
    async ({
        page = 1,
        sortBy,
        voteAverageGte,
        voteAverageLte,
        withGenres,
    }: LoadFilteredMoviesArgs) => {
        const response = await discoverMovies({
            page,
            sortBy,
            voteAverageGte,
            voteAverageLte,
            withGenres,
        });

        return {
            movies: response.results,
            page: response.page,
            totalPages: response.total_pages,
        };
    },
);

const filteredSlice = createSlice({
    name: 'filtered',
    initialState,
    reducers: {
        setSortBy: (state, action: PayloadAction<MovieSort>) => {
            state.sortBy = action.payload;
        },
        setVoteAverageGte: (state, action: PayloadAction<number>) => {
            state.voteAverageGte = action.payload;
        },
        setVoteAverageLte: (state, action: PayloadAction<number>) => {
            state.voteAverageLte = action.payload;
        },
        toggleGenre: (state, action: PayloadAction<number>) => {
            const genreId = action.payload;
            const index = state.withGenres.indexOf(genreId);

            if (index === -1) {
                state.withGenres.push(genreId);
            } else {
                state.withGenres.splice(index, 1);
            }
        },
        resetFilters: state => {
            state.sortBy = initialState.sortBy;
            state.voteAverageGte = initialState.voteAverageGte;
            state.voteAverageLte = initialState.voteAverageLte;
            state.withGenres = [];
        },
        clearError: state => {
            state.error = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadFilteredMovies.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.page = action.meta.arg.page || 1;
            })
            .addCase(loadFilteredMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload.movies;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(loadFilteredMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            });
    },
});

export const {
    setSortBy,
    setVoteAverageGte,
    setVoteAverageLte,
    toggleGenre,
    resetFilters,
    clearError,
} = filteredSlice.actions;

export default filteredSlice.reducer;
