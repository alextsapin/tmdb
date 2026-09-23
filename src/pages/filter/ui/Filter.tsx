import { JSX, useEffect } from 'react';

import { Container, Grid } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/App/store/hooks';
import { FILTER_DEBOUNCE_MS, loadFilteredMovies, Panel } from '@/features/filter';
import {
    GRID_COLUMN_SPACING,
    GRID_ROW_SPACING,
    GRID_SIZE_FILTERED_CARD,
} from '@/pages/filter/model/constants';
import { Paginator } from '@/shared/ui/paginator';
import { MovieCard } from '@/widgets/card';

import css from './filter.module.less';

export const Filter = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const sortBy = useAppSelector(state => state.filtered.sortBy);
    const voteAverageGte = useAppSelector(state => state.filtered.voteAverageGte);
    const voteAverageLte = useAppSelector(state => state.filtered.voteAverageLte);
    const withGenres = useAppSelector(state => state.filtered.withGenres);
    const movies = useAppSelector(state => state.filtered.movies);
    const loading = useAppSelector(state => state.filtered.loading);
    const page = useAppSelector(state => state.filtered.page);
    const totalPages = useAppSelector(state => state.filtered.totalPages);

    const handlePageChange = (newPage: number): void => {
        dispatch(
            loadFilteredMovies({
                page: newPage,
                sortBy,
                voteAverageGte,
                voteAverageLte,
                withGenres,
            }),
        );
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(
                loadFilteredMovies({
                    page: 1,
                    sortBy,
                    voteAverageGte,
                    voteAverageLte,
                    withGenres,
                }),
            );
        }, FILTER_DEBOUNCE_MS);

        return () => clearTimeout(timer);
    }, [dispatch, sortBy, voteAverageGte, voteAverageLte, withGenres]);

    return (
        <Container id="content">
            <h1>Filtered Movies</h1>

            <div className={css.layout}>
                <Panel />

                <section className={css.results}>
                    {loading && (
                        <div className={css.resultsLoading}>Loading movies...</div>
                    )}

                    {!loading && movies.length === 0 && <p>No movies found</p>}

                    {movies.length > 0 && (
                        <Grid
                            container
                            columnSpacing={GRID_COLUMN_SPACING}
                            rowSpacing={GRID_ROW_SPACING}
                        >
                            {movies.map(movie => (
                                <Grid key={movie.id} size={GRID_SIZE_FILTERED_CARD}>
                                    <MovieCard movie={movie} />
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    {totalPages > 1 && (
                        <Paginator
                            totalPages={totalPages}
                            page={page}
                            onPageChange={handlePageChange}
                        />
                    )}
                </section>
            </div>
        </Container>
    );
};
