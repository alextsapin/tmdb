import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../api/api";

export type FavoriteMovie = Pick<
    Movie,
    "id" |
    "title" |
    "poster_path" |
    "vote_average" |
    "release_date"
>;

type FavoritesState = {
    movies: FavoriteMovie[];
};

const initialState: FavoritesState = {
    movies: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<FavoriteMovie>) => {
            state.movies.push(action.payload);
        }
    }
});

export const { addFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
