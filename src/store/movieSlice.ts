import { createSlice } from "@reduxjs/toolkit";
import { MovieDetails, Actor, getMovieById, getMovieCast } from "../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

type MovieState = {
    movie: MovieDetails | null;
    cast: Actor[]
    loading: {
        movie: boolean;
        cast: boolean;
    }
    error: {
        movie: string | null;
        cast: string | null;
    }
};

const initialState: MovieState = {
    movie: null,
    cast: [],
    loading: {
        movie: false,
        cast: false
    },
    error: {
        movie: null,
        cast: null
    }
};

export const loadMovieById = createAsyncThunk("movie/loadMovie", async (id: number) => {
    return getMovieById(id);
});

export const loadMovieCast = createAsyncThunk("movie/loadMovieCast", async (id: number) => {
    return getMovieCast(id);
});

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Movie
        builder.addCase(loadMovieById.pending, (state, action) => {
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
        builder.addCase(loadMovieCast.pending, (state, action) => {
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
    }
});

export default movieSlice.reducer;
