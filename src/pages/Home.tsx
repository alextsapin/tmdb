import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadPopularMovies } from "../store/popSlice";
import { loadTopMovies } from "../store/topSlice";
import { loadUpcomingMovies } from "../store/upcomingSlice";
import { loadNowPlayingMovies } from "../store/nowSlice";
import { Button, Container, Grid } from "@mui/material";
import { Card } from "../Card/Card";
import { Link } from "react-router-dom";
import { Poster } from "../Poster/Poster";

export const HomePage = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadPopularMovies());
        dispatch(loadTopMovies());
        dispatch(loadUpcomingMovies());
        dispatch(loadNowPlayingMovies());
    }, [dispatch]);

    const {popMovies} = useAppSelector((state) => state.pop);
    const {topMovies} = useAppSelector((state) => state.top);
    const {upcomingMovies} = useAppSelector((state) => state.upcoming);
    const {nowPlayingMovies} = useAppSelector((state) => state.nowPlaying);

    console.log(popMovies);

    return (
        <>
            <Poster movies={popMovies}/>
            
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
