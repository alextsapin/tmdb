import { JSX } from 'react';

import { Container, Grid } from '@mui/material';

import { Card } from '../Card/Card';
import { useAppSelector } from '../store/hooks';

export const FavoritesPage = (): JSX.Element => {
    const favorites = useAppSelector(state => state.favorites.movies);

    return (
        <Container id="content">
            <h1>Favorites</h1>
            <Grid container spacing={2}>
                {favorites.map(movie => (
                    <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                        <Card {...movie} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
