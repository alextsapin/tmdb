import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Movie, searchMovies } from '@/api/api';

type State = {
    movies: Movie[];
    page: number;
    totalPages: number;
    totalResults: number;
    loading: boolean;
    error: string | null;
};

const initialState: State = {
    movies: [],
    page: 1,
    totalPages: 0,
    totalResults: 0,
    loading: false,
    error: null,
};

type LoadSearchMoviesArgs = {
    query: string;
    page?: number;
};

export const loadSearchMovies = createAsyncThunk(
    'search/loadSearchMovies',
    async ({ query, page = 1 }: LoadSearchMoviesArgs) => {
        return searchMovies(query, page);
    },
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        resetMovies: () => ({
            ...initialState,
        }),
        clearError: state => {
            state.error = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadSearchMovies.pending, state => {
                state.loading = true;
                state.error = null;
                state.movies = [];
            })
            .addCase(loadSearchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload.results;
                state.page = action.payload.page;
                state.totalPages = action.payload.total_pages;
                state.totalResults = action.payload.total_results;
            })
            .addCase(loadSearchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            });
    },
});

export const { resetMovies, clearError } = searchSlice.actions;
export default searchSlice.reducer;
