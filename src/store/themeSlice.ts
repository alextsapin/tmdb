import { createSlice } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark';

type ThemeState = {
    mode: ThemeMode;
};

const loadTheme = (): ThemeMode => {
    const data = localStorage.getItem('theme');

    if (!data) return 'dark';

    return JSON.parse(data);
};

const initialState: ThemeState = {
    mode: loadTheme(),
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: state => {
            state.mode = state.mode === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', JSON.stringify(state.mode));
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
