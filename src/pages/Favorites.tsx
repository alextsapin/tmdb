import { JSX } from 'react';

import { Container, Grid } from '@mui/material';

import { MovieCard } from '@/entities/movie';
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
                            <MovieCard {...movie} />
                        </Grid>
                    ))
                ) : (
                    <p>No favorites yet...</p>
                )}
            </Grid>
        </Container>
    );
};
