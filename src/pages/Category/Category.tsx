/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSX, useEffect } from 'react';

import { Button, Container, Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/App/store/hooks';
import { loadMoviesByCategory } from '@/entities/movie';
import css from '@/pages/Category/category.module.less';
import {
    CONTENT_MARGIN_TOP,
    GRID_COLUMN_SPACING,
    GRID_ROW_SPACING,
    GRID_SIZE_MOVIE_CARD,
} from '@/shared/constants';
import { Paginator } from '@/shared/ui/paginator';
import { MovieCard } from '@/widgets/movie-card';

type CategoryKey = 'popular' | 'top' | 'upcoming' | 'nowPlaying';

const categories: { key: CategoryKey; label: string }[] = [
    { key: 'popular', label: 'Popular' },
    { key: 'top', label: 'Top rated' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'nowPlaying', label: 'Now playing' },
];

export const Category = (): JSX.Element => {
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useAppDispatch();

    const category = (searchParams.get('category') as CategoryKey) || 'popular';
    const title = categories.find(item => item.key === category)?.label || 'Popular';
    const movies = useAppSelector(state => state.movies.categories[category]);
    const loading = useAppSelector(state => state.movies.loading[category]);
    const page = useAppSelector(state => state.movies.page[category]);
    const totalPages = useAppSelector(state => state.movies.totalPages[category]);

    useEffect(() => {
        dispatch(loadMoviesByCategory({ category }));
    }, [dispatch, category]);

    const handlePageChange = (newPage: number): void => {
        dispatch(
            loadMoviesByCategory({
                category,
                page: newPage,
            }),
        );
    };

    return (
        <Container id="content">
            <h1>{title}</h1>

            <div className={css.buttons}>
                {categories.map(item => (
                    <Button
                        key={item.key}
                        variant={category === item.key ? 'contained' : 'outlined'}
                        onClick={() => setSearchParams({ category: item.key })}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>

            {loading ? (
                <div className={css.loading}>
                    <span>Loading movies</span>
                    <span className={css.dots}>...</span>
                </div>
            ) : (
                <Grid
                    container
                    columnSpacing={GRID_COLUMN_SPACING}
                    rowSpacing={GRID_ROW_SPACING}
                    sx={{ mt: CONTENT_MARGIN_TOP }}
                >
                    {movies.map(movie => (
                        <Grid key={movie.id} size={GRID_SIZE_MOVIE_CARD}>
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
        </Container>
    );
};
