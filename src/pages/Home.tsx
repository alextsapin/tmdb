/* eslint-disable no-magic-numbers */
/* eslint-disable react/no-array-index-key */
import { JSX, useEffect } from 'react';

import { Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import { Card } from '../Card/Card';
import { Poster } from '../Poster/Poster';
import { MovieCardSkeleton } from '../Skeleton/MovieCardSkeleton';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadMoviesByCategory } from '../store/moviesSlice';

export const Home = (): JSX.Element => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadMoviesByCategory({ category: 'popular' }));
        dispatch(loadMoviesByCategory({ category: 'top' }));
        dispatch(loadMoviesByCategory({ category: 'upcoming' }));
        dispatch(loadMoviesByCategory({ category: 'nowPlaying' }));
    }, [dispatch]);

    const popMovies = useAppSelector(state => state.movies.categories.popular);
    const topMovies = useAppSelector(state => state.movies.categories.top);
    const upcomingMovies = useAppSelector(state => state.movies.categories.upcoming);
    const nowPlayingMovies = useAppSelector(state => state.movies.categories.nowPlaying);

    const loading = useAppSelector(state => state.movies.loading);

    return (
        <>
            <Poster movies={popMovies} />

            <Container id="content">
                <h2 className="title title_second">Popular movies</h2>

                <Grid container spacing={2}>
                    {loading.popular
                        ? Array.from({ length: 6 }).map((_, index) => (
                              <MovieCardSkeleton key={`popular-${index}`} />
                          ))
                        : popMovies?.slice(0, 6).map(m => (
                              <Grid key={m.id} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                                  <Card {...m} />
                              </Grid>
                          ))}
                </Grid>

                <Button
                    component={Link}
                    to="/category-movies/"
                    sx={{ mt: 3 }}
                    variant="contained"
                >
                    View more
                </Button>

                <h2 className="title title_second">Top rated movies</h2>
                <Grid container spacing={2}>
                    {loading.top
                        ? Array.from({ length: 6 }).map((_, index) => (
                              <MovieCardSkeleton key={index} />
                          ))
                        : topMovies?.slice(0, 6).map(m => (
                              <Grid key={m.id} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                                  <Card {...m} />
                              </Grid>
                          ))}
                </Grid>
                <Button
                    component={Link}
                    to="/category-movies/?category=top"
                    sx={{ mt: 3 }}
                    variant="contained"
                >
                    View more
                </Button>

                <h2 className="title title_second">Upcoming</h2>
                <Grid container spacing={2}>
                    {loading.upcoming
                        ? Array.from({ length: 6 }).map((_, index) => (
                              <MovieCardSkeleton key={index} />
                          ))
                        : upcomingMovies?.slice(0, 6).map(m => (
                              <Grid key={m.id} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                                  <Card {...m} />
                              </Grid>
                          ))}
                </Grid>
                <Button
                    component={Link}
                    to="/category-movies/?category=upcoming"
                    sx={{ mt: 3 }}
                    variant="contained"
                >
                    View more
                </Button>

                <h2 className="title title_second">Now playing movies</h2>
                <Grid container spacing={2}>
                    {loading.nowPlaying
                        ? Array.from({ length: 6 }).map((_, index) => (
                              <MovieCardSkeleton key={index} />
                          ))
                        : nowPlayingMovies?.slice(0, 6).map(m => (
                              <Grid key={m.id} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                                  <Card {...m} />
                              </Grid>
                          ))}
                </Grid>
                <Button
                    component={Link}
                    to="/category-movies/?category=nowPlaying"
                    sx={{ mt: 3 }}
                    variant="contained"
                >
                    View more
                </Button>
            </Container>
        </>
    );
};
