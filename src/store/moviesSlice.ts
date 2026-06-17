import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMoviesByCategory, Movie, MovieCategory } from "../api/api";

type State = {
    categories: {
        popular: Movie[],
        top: Movie[],
        upcoming: Movie[],
        nowPlaying: Movie[]
    },
    loading: {
        popular: boolean;
        top: boolean;
        upcoming: boolean;
        nowPlaying: boolean;
    },
    error: {
        popular: string | null;
        top: string | null;
        upcoming: string | null;
        nowPlaying: string | null;
    }
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

    error: {
        popular: null,
        top: null,
        upcoming: null,
        nowPlaying: null,
    }
}

type LoadMoviesByCategoryArgs = {
    category: MovieCategory;
    page?: number;
};

export const loadMoviesByCategory = createAsyncThunk(
    'movies/loadMoviesByCategory',
    async ({ category, page = 1 }: LoadMoviesByCategoryArgs) => {
        const { results: movies } = await getMoviesByCategory(category, page);
        return { category, movies };
    },
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            loadMoviesByCategory.fulfilled,
            (state, action) => {
                state.categories[action.payload.category] =
                    action.payload.movies;
            },
        );
    },
});

export default moviesSlice.reducer;
