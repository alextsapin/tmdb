import { useAppSelector } from "../store/hooks";

import { Container, Grid } from "@mui/material"
import { Card } from "../Card/Card";

export const FavoritesPage = () => {
    const favorites = useAppSelector(state => state.favorites.movies);

    return (
        <Container id="content">
            <Grid container spacing={2}>
                {favorites.map(movie => (
                    <Card key={movie.id} {...movie} />
                ))}
            </Grid>
        </Container>
    )
}
