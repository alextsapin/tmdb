import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Button, Container, Grid } from "@mui/material";
import { Card } from "../Card/Card";
import { Link } from "react-router-dom";
import { Poster } from "../Poster/Poster";
import { loadMoviesByCategory } from "../store/moviesSlice";
import { MovieCardSkeleton } from "../Skeleton/MovieCardSkeleton";

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

    const loading = useAppSelector((state) => state.movies.loading);
    
    return (
        <>
            <Poster movies={popMovies} />

            <Container id="content">
                <h2 className='title title_second'>Popular movies</h2>

                <Grid container spacing={2}>
                    {loading.popular
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <MovieCardSkeleton key={index} />
                        ))
                        : popMovies?.slice(0, 6).map((m) => (
                            <Card key={m.id} {...m} />
                        ))}
                </Grid>

                <Button component={Link} to="/category-movies/" sx={{mt: 3}} variant="contained">View more</Button>

                <h2 className='title title_second'>Top rated movies</h2>
                <Grid container spacing={2}>
                    {loading.top
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <MovieCardSkeleton key={index} />
                        ))
                        : topMovies?.slice(0, 6).map((m) => (
                            <Card key={m.id} {...m} />
                        ))}
                </Grid>
                <Button component={Link} to="/category-movies/" sx={{mt: 3}} variant="contained">View more</Button>

                <h2 className='title title_second'>Upcoming</h2>
                <Grid container spacing={2}>
                    {loading.upcoming
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <MovieCardSkeleton key={index} />
                        ))
                        : upcomingMovies?.slice(0, 6).map((m) => (
                            <Card key={m.id} {...m} />
                        ))}
                </Grid>
                <Button component={Link} to="/category-movies/" sx={{mt: 3}} variant="contained">View more</Button>

                <h2 className='title title_second'>Now playing movies</h2>
                <Grid container spacing={2}>
                    {loading.nowPlaying
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <MovieCardSkeleton key={index} />
                        ))
                        : nowPlayingMovies?.slice(0, 6).map((m) => (
                            <Card key={m.id} {...m} />
                        ))}
                </Grid>
                <Button component={Link} to="/category-movies/" sx={{mt: 3}} variant="contained">View more</Button>
            </Container>
        </>
    )
}
