/* eslint-disable no-promise-executor-return */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getMoviesByCategory } from '@/api/api';
import { Movie, MovieCategory } from '@/entities/movie';


type State = {
    categories: {
        popular: Movie[];
        top: Movie[];
        upcoming: Movie[];
        nowPlaying: Movie[];
    };
    loading: {
        popular: boolean;
        top: boolean;
        upcoming: boolean;
        nowPlaying: boolean;
    };
    page: {
        popular: number;
        top: number;
        upcoming: number;
        nowPlaying: number;
    };
    totalPages: {
        popular: number;
        top: number;
        upcoming: number;
        nowPlaying: number;
    };
    error: {
        popular: string | null;
        top: string | null;
        upcoming: string | null;
        nowPlaying: string | null;
    };
};

const initialState: State = {
    categories: {
        popular: [],
        top: [],
        upcoming: [],
        nowPlaying: [],
    },

    loading: {
        popular: false,
        top: false,
        upcoming: false,
        nowPlaying: false,
    },

    page: {
        popular: 1,
        top: 1,
        upcoming: 1,
        nowPlaying: 1,
    },

    totalPages: {
        popular: 1,
        top: 1,
        upcoming: 1,
        nowPlaying: 1,
    },

    error: {
        popular: null,
        top: null,
        upcoming: null,
        nowPlaying: null,
    },
};

type LoadMoviesByCategoryArgs = {
    category: MovieCategory;
    page?: number;
};

export const loadMoviesByCategory = createAsyncThunk(
    'movies/loadMoviesByCategory',
    async ({ category, page = 1 }: LoadMoviesByCategoryArgs) => {
        const response = await getMoviesByCategory(category, page);

        return {
            category,
            movies: response.results,
            page: response.page,
            totalPages: response.total_pages,
        };
    },
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        clearCategoryError: (state, action: PayloadAction<MovieCategory>) => {
            state.error[action.payload] = null;
        },
        clearErrors: state => {
            state.error.popular = null;
            state.error.top = null;
            state.error.upcoming = null;
            state.error.nowPlaying = null;
        },
    },
    extraReducers: builder => {
        builder.addCase(loadMoviesByCategory.pending, (state, action) => {
            const { category, page = 1 } = action.meta.arg;

            state.loading[category] = true;
            state.error[category] = null;
            state.page[category] = page;
        });
        builder.addCase(loadMoviesByCategory.fulfilled, (state, action) => {
            state.categories[action.payload.category] = action.payload.movies;
            state.page[action.payload.category] = action.payload.page;
            state.totalPages[action.payload.category] = action.payload.totalPages;
            state.loading[action.payload.category] = false;
        });
        builder.addCase(loadMoviesByCategory.rejected, (state, action) => {
            const { category } = action.meta.arg;

            state.loading[category] = false;
            state.error[category] = action.error.message || null;
        });
    },
});

export const { clearCategoryError, clearErrors } = moviesSlice.actions;

export default moviesSlice.reducer;
