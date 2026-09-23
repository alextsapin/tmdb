/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
import { ReactElement, useEffect, useMemo } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';

import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { Category } from '@/pages/category';
import { FavoritesPage } from '@/pages/Favorites';
import { Filter } from '@/pages/filter';
import { Home } from '@/pages/Home';
import { MoviePage } from '@/pages/movie';
import { NotFoundPage } from '@/pages/NotFound';
import { SearchPage } from '@/pages/search';
import { getDesignTokens } from './theme';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { LinearProgress } from '@mui/material';
import { Snackbar } from '@/shared/ui/snackbar';
import { clearMovieErrors, clearMoviesErrors } from '@/entities/movie';
import { clearError as clearFilteredError } from '@/features/filter';
import { clearError as clearSearchError } from '@/features/search';

import './styles/App.less';

export const App = (): ReactElement => {
    // eslint-disable-next-line prettier/prettier
    const dispatch = useAppDispatch();

    const themeMode = useAppSelector(state => state.theme.mode);
    const moviesLoading = useAppSelector(state => state.movies.loading);
    const movieLoading = useAppSelector(state => state.movie.loading);
    const searchLoading = useAppSelector(state => state.search.loading);
    const filteredLoading = useAppSelector(state => state.filtered.loading);

    const searchError = useAppSelector(state => state.search.error);
    const filteredError = useAppSelector(state => state.filtered.error);
    const movieErrors = useAppSelector(state => state.movie.error);
    const moviesErrors = useAppSelector(state => state.movies.error);

    const globalError =
        searchError ||
        filteredError ||
        movieErrors.movie ||
        movieErrors.cast ||
        movieErrors.similar ||
        moviesErrors.popular ||
        moviesErrors.top ||
        moviesErrors.upcoming ||
        moviesErrors.nowPlaying ||
        null;

    // Clear errors
    const handleCloseError = (): void => {
        if (searchError) {
            dispatch(clearSearchError());
        }

        if (filteredError) {
            dispatch(clearFilteredError());
        }

        if (movieErrors.movie || movieErrors.cast || movieErrors.similar) {
            dispatch(clearMovieErrors());
        }

        if (
            moviesErrors.popular ||
            moviesErrors.top ||
            moviesErrors.upcoming ||
            moviesErrors.nowPlaying
        ) {
            dispatch(clearMoviesErrors());
        }
    };

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
            {isLoading && <LinearProgress color="error" />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MoviePage />} />
                <Route path="/category-movies/" element={<Category />} />
                <Route path="/filtered-movies/" element={<Filter />} />
                <Route path="/search/" element={<SearchPage />} />
                <Route path="/favorites/" element={<FavoritesPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Snackbar error={globalError} onClose={handleCloseError} />
            <Footer />
        </ThemeProvider>
    );
};
