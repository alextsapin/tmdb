/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
import { ReactElement, useEffect, useMemo } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';

import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Category } from './pages/Category/Category';
import { FavoritesPage } from './pages/Favorites';
import { FilteredMovies } from './pages/Filtered/Filtered';
import { Home } from './pages/Home';
import { MoviePage } from './pages/Movie/Movie';
import { NotFoundPage } from './pages/NotFound';
import { SearchPage } from './pages/Search/Search';
import { getDesignTokens } from './theme';
import './less/App.less';
import { useAppSelector } from './store/hooks';
import { LinearProgress } from '@mui/material';

export const App = (): ReactElement => {
    const themeMode = useAppSelector(state => state.theme.mode);
    const moviesLoading = useAppSelector(state => state.movies.loading);
    const movieLoading = useAppSelector(state => state.movie.loading);
    const searchLoading = useAppSelector(state => state.search.loading);
    const filteredLoading = useAppSelector(state => state.filtered.loading);

    const isLoading =
        Object.values(moviesLoading).some(Boolean) ||
        Object.values(movieLoading).some(Boolean) ||
        searchLoading ||
        filteredLoading;

    const theme = useMemo(() => createTheme(getDesignTokens(themeMode)), [themeMode]);

    useEffect(() => {
        document.body.setAttribute('data-theme', themeMode);
    }, [themeMode]);

    return (
        <ThemeProvider theme={theme}>
            <Header />
            {isLoading && <LinearProgress />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MoviePage />} />
                <Route path="/category-movies/" element={<Category />} />
                <Route path="/filtered-movies/" element={<FilteredMovies />} />
                <Route path="/search/" element={<SearchPage />} />
                <Route path="/favorites/" element={<FavoritesPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </ThemeProvider>
    );
};
