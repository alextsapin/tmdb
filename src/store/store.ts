import { configureStore } from '@reduxjs/toolkit';

import posterReducer from './posterSlice';
import popReducer from './popSlice';
import topReducer from './topSlice';
import upcomingReducer from './upcomingSlice';
import nowPlayingReducer from './nowSlice';

export const store = configureStore({
    reducer: {
        poster: posterReducer,
        pop: popReducer,
        top: topReducer,
        upcoming: upcomingReducer,
        nowPlaying: nowPlayingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
