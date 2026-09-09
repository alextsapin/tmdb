/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSX, useEffect } from 'react';

import { Button, Container, Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { Card } from '../../Card/Card';
import { Paginator } from '../../Paginator/Paginator';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadMoviesByCategory } from '../../store/moviesSlice';

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
                        <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                            <Card {...movie} />
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
