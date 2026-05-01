import { configureStore } from '@reduxjs/toolkit';

import posterReducer from './posterSlice';

export const store = configureStore({
    reducer: {
        poster: posterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
