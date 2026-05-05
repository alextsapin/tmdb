import { Button, Container, Grid } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Card } from "../Card/Card";
import { useEffect } from "react";
import { loadPopularMovies } from "../store/popSlice";

export const CategoryMoviesPage = () => {
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(loadPopularMovies());
    }, [dispatch]);

    const {popMovies} = useAppSelector((state) => state.pop);
    
    return (
        <Container id="content">
            <Button variant="contained" sx={{mt:5, mr:2}}>Popular movies</Button>
            <Button variant="outlined" sx={{mt:5, mr:2}}>Top rated movies</Button>
            <Button variant="outlined" sx={{mt:5, mr:2}}>Upcoming</Button>
            <Button variant="outlined" sx={{mt:5}}>Now playing movies</Button>

            <Grid container spacing={2} sx={{mt:5}}>
                {popMovies?.map((m) => (
                    <Card key={m.id} {...m} />
                ))}
            </Grid>


        </Container>
    )
}
