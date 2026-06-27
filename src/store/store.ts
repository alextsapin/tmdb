import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        search: searchReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
