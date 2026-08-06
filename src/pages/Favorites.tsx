import { JSX } from 'react';

import { Container, Grid } from '@mui/material';

import { Card } from '../Card/Card';
import { useAppSelector } from '../store/hooks';

export const FavoritesPage = (): JSX.Element => {
    const favorites = useAppSelector(state => state.favorites.movies);

    return (
        <Container id="content">
            <h1 className="title title_first">Favorites</h1>
            <Grid container spacing={2}>
                {favorites.map(movie => (
                    <Card key={movie.id} {...movie} />
                ))}
            </Grid>
        </Container>
    );
};
