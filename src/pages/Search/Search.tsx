/* eslint-disable prettier/prettier */
import { JSX, useCallback, useEffect, useState } from 'react';

import { Container, Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import css from '@/pages/Search/search.module.less';
import { Paginator } from '@/Paginator/Paginator';
import { SearchForm } from '@/SearchForm/SearchForm';
import {
    CONTENT_MARGIN_TOP,
    GRID_COLUMN_SPACING,
    GRID_ROW_SPACING,
    GRID_SIZE_MOVIE_CARD,
} from '@/shared/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loadSearchMovies, resetMovies } from '@/store/searchSlice';
import { MovieCard } from '@/widgets/movie-card';

export const SearchPage = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();

    const query = searchParams.get('query') || '';
    const [page, setPage] = useState<number>(Number(searchParams.get('page')) || 1);
    const [prevQuery, setPrevQuery] = useState(query);

    // Reset page when the search query changes (including clear via ×)
    if (query !== prevQuery) {
        setPrevQuery(query);
        setPage(1);
    }

    const handlePageChange = (newPage: number): void => {
        setPage(newPage);
    };

    const movies = useAppSelector(state => state.search.movies);
    const loading = useAppSelector(state => state.search.loading);
    const totalResults = useAppSelector(state => state.search.totalResults);
    const totalPages = useAppSelector(state => state.search.totalPages);

    useEffect(() => {
        if (!query.trim()) return;
        dispatch(loadSearchMovies({ query, page }));
    }, [dispatch, query, page]);

    useEffect(() => {
        return () => {
            dispatch(resetMovies());
        };
    }, [dispatch]);

    const resetMoviesHandler = useCallback(() => {
        dispatch(resetMovies());
    }, [dispatch]);

    return (
        <Container id="content">
            <h1>Search</h1>

            <SearchForm onResetMovies={resetMoviesHandler} />

            {query && (
                <div className={css.header}>
                    <p>
                        Search results for: <b>{query}</b>
                    </p>
                    {totalResults > 0 && <span>{totalResults} movies found</span>}
                </div>
            )}

            <div className={css.body}>
                {loading && (
                    <div className={css.loading}>
                        <span>Loading movies</span>
                        <span className={css.dots}>...</span>
                    </div>
                )}

                {!loading && query && totalResults === 0 && <p>No movies found</p>}

                {!loading && movies && movies.length > 0 && (
                    <Grid
                        container
                        sx={{ mt: CONTENT_MARGIN_TOP }}
                        columnSpacing={GRID_COLUMN_SPACING}
                        rowSpacing={GRID_ROW_SPACING}
                    >
                        {movies.map(movie => (
                            <Grid key={movie.id} size={GRID_SIZE_MOVIE_CARD}>
                                <MovieCard movie={movie} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </div>

            {totalPages > 1 && (
                <Paginator
                    totalPages={totalPages}
                    page={page}
                    onPageChange={handlePageChange}
                />
            )}
        </Container>
    );
};
