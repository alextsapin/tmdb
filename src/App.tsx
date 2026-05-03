/* eslint-disable @typescript-eslint/no-redeclare */
import { useEffect } from 'react';

import { getBackdropUrl } from './api/api';
import { Header } from './Header/Header';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { loadRandomPosterMovie } from './store/posterSlice';

import './less/App.less';
import { loadPopularMovies } from './store/popSlice';
import { Button, Container, Grid } from '@mui/material';
import { Card } from './Card/Card';
import { Link } from 'react-router-dom';
import { loadTopMovies } from './store/topSlice';
import { loadUpcomingMovies } from './store/upcomingSlice';
import { loadNowPlayingMovies } from './store/nowSlice';
import { Footer } from './Footer/Footer';

export const App = () => {
    const dispatch = useAppDispatch();

    const {movie, loading, error} = useAppSelector((state) => state.poster);
    const {popMovies} = useAppSelector((state) => state.pop);
    const {topMovies} = useAppSelector((state) => state.top);
    const {upcomingMovies} = useAppSelector((state) => state.upcoming);
    const {nowPlayingMovies} = useAppSelector((state) => state.nowPlaying);

    useEffect(() => {
        dispatch(loadRandomPosterMovie());
        dispatch(loadPopularMovies());
        dispatch(loadTopMovies());
        dispatch(loadUpcomingMovies());
        dispatch(loadNowPlayingMovies());
    }, [dispatch]);

    return (
        <>
            <Header/>
            {loading && <div className="poster">Загрузка...</div>}
            {error && <div className="poster">{error}</div>}

            {!loading && !error && (
                <div className="poster"
                    style={{
                        backgroundImage: movie?.backdrop_path
                            ? `linear-gradient(
                                rgba(0, 0, 0, 0.45),
                                rgba(0, 0, 0, 0.85)
                            ), url(${getBackdropUrl(movie.backdrop_path)})`
                            : undefined,
                    }}
                />
            )}
            
            <Container id="content">
                <h2 className='title title_second'>Popular movies</h2>
                <Grid container spacing={2}>
                    {popMovies?.slice(0, 6).map((m) => (
                        <Card key={m.id} {...m} />
                    ))}
                </Grid>
                <Button component={Link} to="/category-movies/" sx={{mt: 3}} variant="contained">View more</Button>

                <h2 className='title title_second'>Top rated movies</h2>
                <Grid container spacing={2}>
                    {topMovies?.slice(0, 6).map((m) => (
                        <Card key={m.id} {...m} />
                    ))}
                </Grid>
                <Button component={Link} to="/category-movies/" sx={{mt: 3}} variant="contained">View more</Button>

                <h2 className='title title_second'>Upcoming</h2>
                <Grid container spacing={2}>
                    {upcomingMovies?.slice(0, 6).map((m) => (
                        <Card key={m.id} {...m} />
                    ))}
                </Grid>
                <Button component={Link} to="/category-movies/" sx={{mt: 3}} variant="contained">View more</Button>

                <h2 className='title title_second'>Now playing movies</h2>
                <Grid container spacing={2}>
                    {nowPlayingMovies?.slice(0, 6).map((m) => (
                        <Card key={m.id} {...m} />
                    ))}
                </Grid>
                <Button component={Link} to="/category-movies/" sx={{mt: 3}} variant="contained">View more</Button>
            </Container>
            <Footer/>
        </>
    );
};


