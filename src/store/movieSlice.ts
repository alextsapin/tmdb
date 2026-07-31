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
});

export default movieSlice.reducer;
