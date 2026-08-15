/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSX, useEffect } from 'react';

import { Button, Container, Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { Card } from '../../Card/Card';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadMoviesByCategory } from '../../store/moviesSlice';

import css from './category.module.less';

type CategoryKey = 'popular' | 'top' | 'upcoming' | 'nowPlaying';

const categories: { key: CategoryKey; label: string }[] = [
    { key: 'popular', label: 'Popular' },
    { key: 'top', label: 'Top Rated' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'nowPlaying', label: 'Now Playing' },
];

export const Category = (): JSX.Element => {
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useAppDispatch();

    const category = (searchParams.get('category') as CategoryKey) || 'popular';
    const movies = useAppSelector(state => state.movies.categories[category]);
    const loading = useAppSelector(state => state.movies.loading[category]);
    const error = useAppSelector(state => state.movies.error[category]);

    useEffect(() => {
        dispatch(loadMoviesByCategory({ category }));
    }, [dispatch, category]);

    return (
        <Container id="content">
            <h1>Category Movies</h1>

            <div className={css.buttons}>
                {categories.map(item => (
                    <Button
                        key={item.key}
                        variant="contained"
                        onClick={() => setSearchParams({ category: item.key })}
                        disabled={category === item.key}
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
        </Container>
    );
};
