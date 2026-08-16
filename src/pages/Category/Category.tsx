/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSX, useEffect } from 'react';

import { Button, Container, Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { Card } from '../../Card/Card';
import { Paginator } from '../../Paginator/Paginator';
import { ErrorSnackbar } from '../../Snackbar/Snackbar';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadMoviesByCategory, clearCategoryError } from '../../store/moviesSlice';

import css from './category.module.less';

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
    const error = useAppSelector(state => state.movies.error[category]);

    const handleCloseError = (): void => {
        dispatch(clearCategoryError(category));
    };

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
                <Grid container columnSpacing={2} rowSpacing={4} sx={{ mt: 5 }}>
                    {movies.map(movie => (
                        <Card key={movie.id} {...movie} />
                    ))}
                </Grid>
            )}

            <ErrorSnackbar error={error} onClose={handleCloseError} />
            <Paginator
                totalResults={movies.length}
                totalPages={totalPages}
                page={page}
                onPageChange={handlePageChange}
            />
        </Container>
    );
};
