/* eslint-disable react/no-array-index-key */
import { JSX, useEffect } from 'react';

import { Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import { Skeleton } from '@/entities/movie';
import {
    BUTTON_MARGIN_TOP,
    GRID_SIZE_MOVIE_CARD,
    GRID_SPACING,
    PREVIEW_ITEMS_COUNT,
} from '@/shared/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loadMoviesByCategory } from '@/store/moviesSlice';
import { Hero } from '@/widgets/hero';
import { MovieCard } from '@/widgets/movie-card';

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
            <Hero movies={popMovies} />

            <Container id="content">
                {popMovies.length > 0 && (
                    <>
                        <h2 className="title title_second">Popular movies</h2>

                        <Grid container spacing={GRID_SPACING}>
                            {loading.popular
                                ? Array.from({ length: PREVIEW_ITEMS_COUNT }).map(
                                      (_, index) => <Skeleton key={`popular-${index}`} />,
                                  )
                                : popMovies?.slice(0, PREVIEW_ITEMS_COUNT).map(m => (
                                      <Grid key={m.id} size={GRID_SIZE_MOVIE_CARD}>
                                          <MovieCard movie={m} />
                                      </Grid>
                                  ))}
                        </Grid>

                        <Button
                            component={Link}
                            to="/category-movies/"
                            sx={{ mt: BUTTON_MARGIN_TOP }}
                            variant="contained"
                        >
                            View more
                        </Button>
                    </>
                )}

                {topMovies.length > 0 && (
                    <>
                        <h2 className="title title_second">Top rated movies</h2>
                        <Grid container spacing={GRID_SPACING}>
                            {loading.top
                                ? Array.from({ length: PREVIEW_ITEMS_COUNT }).map(
                                      (_, index) => <Skeleton key={`top-${index}`} />,
                                  )
                                : topMovies?.slice(0, PREVIEW_ITEMS_COUNT).map(m => (
                                      <Grid key={m.id} size={GRID_SIZE_MOVIE_CARD}>
                                          <MovieCard movie={m} />
                                      </Grid>
                                  ))}
                        </Grid>
                        <Button
                            component={Link}
                            to="/category-movies/?category=top"
                            sx={{ mt: BUTTON_MARGIN_TOP }}
                            variant="contained"
                        >
                            View more
                        </Button>
                    </>
                )}

                {upcomingMovies.length > 0 && (
                    <>
                        <h2 className="title title_second">Upcoming</h2>
                        <Grid container spacing={GRID_SPACING}>
                            {loading.upcoming
                                ? Array.from({ length: PREVIEW_ITEMS_COUNT }).map(
                                      (_, index) => (
                                          <Skeleton key={`upcoming-${index}`} />
                                      ),
                                  )
                                : upcomingMovies?.slice(0, PREVIEW_ITEMS_COUNT).map(m => (
                                      <Grid key={m.id} size={GRID_SIZE_MOVIE_CARD}>
                                          <MovieCard movie={m} />
                                      </Grid>
                                  ))}
                        </Grid>
                        <Button
                            component={Link}
                            to="/category-movies/?category=upcoming"
                            sx={{ mt: BUTTON_MARGIN_TOP }}
                            variant="contained"
                        >
                            View more
                        </Button>
                    </>
                )}

                {nowPlayingMovies.length > 0 && (
                    <>
                        <h2 className="title title_second">Now playing movies</h2>
                        <Grid container spacing={GRID_SPACING}>
                            {loading.nowPlaying
                                ? Array.from({ length: PREVIEW_ITEMS_COUNT }).map(
                                      (_, index) => (
                                          <Skeleton key={`nowPlaying-${index}`} />
                                      ),
                                  )
                                : nowPlayingMovies
                                      ?.slice(0, PREVIEW_ITEMS_COUNT)
                                      .map(m => (
                                          <Grid key={m.id} size={GRID_SIZE_MOVIE_CARD}>
                                              <MovieCard movie={m} />
                                          </Grid>
                                      ))}
                        </Grid>
                        <Button
                            component={Link}
                            to="/category-movies/?category=nowPlaying"
                            sx={{ mt: BUTTON_MARGIN_TOP }}
                            variant="contained"
                        >
                            View more
                        </Button>
                    </>
                )}
            </Container>
        </>
    );
};
