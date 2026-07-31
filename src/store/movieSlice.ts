import { createSlice } from "@reduxjs/toolkit";
import { MovieDetails } from "../api/api";
import { getMovieById } from "../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

type MovieState = {
    movie: MovieDetails | null;
    loading: boolean;
    error: string | null;
};

const initialState: MovieState = {
    movie: null,
    loading: false,
    error: null,
};

export const loadMovieById = createAsyncThunk("movie/loadMovie", async (id: number) => {
    return getMovieById(id);
});

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadMovieById.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(loadMovieById.fulfilled, (state, action) => {
            //state.categories[action.payload.category] = action.payload.movies;
            state.movie = action.payload;
            state.loading = false;
        });

        builder.addCase(loadMovieById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
    }
});

export default movieSlice.reducer;
