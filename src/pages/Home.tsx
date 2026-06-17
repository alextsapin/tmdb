import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Button, Container, Grid } from "@mui/material";
import { Card } from "../Card/Card";
import { Link } from "react-router-dom";
import { Poster } from "../Poster/Poster";
import { loadMoviesByCategory } from "../store/moviesSlice";

export const HomePage = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadMoviesByCategory({ category: 'popular' }));
        dispatch(loadMoviesByCategory({ category: 'top' }));
        dispatch(loadMoviesByCategory({ category: 'upcoming' }));
        dispatch(loadMoviesByCategory({ category: 'nowPlaying' }));
    }, [dispatch]);

    const popMovies = useAppSelector((state) => state.movies.categories.popular);
    const topMovies = useAppSelector((state) => state.movies.categories.top);
    const upcomingMovies = useAppSelector((state) => state.movies.categories.upcoming);
    const nowPlayingMovies = useAppSelector((state) => state.movies.categories.nowPlaying);

    return (
        <>
            <Poster movies={popMovies} />

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
        </>
    )
}
