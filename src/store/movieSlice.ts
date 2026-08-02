import { createSlice } from "@reduxjs/toolkit";
import { MovieDetails, Actor, getMovieById, getMovieCast } from "../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

type MovieState = {
    movie: MovieDetails | null;
    cast: Actor[] | null
    loading: boolean;
    error: string | null;
};

const initialState: MovieState = {
    movie: null,
    cast: null,
    loading: false,
    error: null,
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
            state.loading = true;
            state.error = null;
        });

        builder.addCase(loadMovieById.fulfilled, (state, action) => {
            state.movie = action.payload;
            state.loading = false;
        });

        builder.addCase(loadMovieById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });

        // Cast
        builder.addCase(loadMovieCast.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(loadMovieCast.fulfilled, (state, action) => {
            state.cast = action.payload;
            state.loading = false;
        });

        builder.addCase(loadMovieCast.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
    }
});

export default movieSlice.reducer;
