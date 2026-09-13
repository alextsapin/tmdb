import { JSX } from 'react';

import { Container, Grid } from '@mui/material';

import { Card } from '@/Card/Card';
import { GRID_SIZE_MOVIE_CARD, GRID_SPACING } from '@/shared/constants';
import { useAppSelector } from '@/store/hooks';

export const FavoritesPage = (): JSX.Element => {
    const favorites = useAppSelector(state => state.favorites.movies);

    return (
        <Container id="content">
            <h1>Favorites</h1>
            <Grid container spacing={GRID_SPACING}>
                {favorites.length > 0 ? (
                    favorites.map(movie => (
                        <Grid key={movie.id} size={GRID_SIZE_MOVIE_CARD}>
                            <Card {...movie} />
                        </Grid>
                    ))
                ) : (
                    <p>No favorites yet...</p>
                )}
            </Grid>
        </Container>
    );
};
