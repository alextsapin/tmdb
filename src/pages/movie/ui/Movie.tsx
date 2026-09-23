/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSX, useEffect } from 'react';

import ReplyIcon from '@mui/icons-material/Reply';
import { Button, Container, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/App/store/hooks';
import {
    getRatingColor,
    loadMovieById,
    loadMovieCast,
    loadSimilarMovies,
    PREVIEW_ITEMS_COUNT,
    RATING_DECIMAL_PLACES,
    runtimeConverter,
} from '@/entities/movie';
import noPhoto from '@/entities/movie/assets/no-photo.png';
import noPoster from '@/entities/movie/assets/no-poster.webp';
import {
    CONTENT_MARGIN_TOP,
    GRID_SIZE_DETAILS,
    GRID_SIZE_POSTER,
} from '@/pages/movie/model/constants';
import { GRID_SIZE_MOVIE_CARD, GRID_SPACING, MovieCard } from '@/widgets/card';

import css from './movie.module.less';

export const MoviePage = (): JSX.Element => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        const movieId = Number(id);

        dispatch(loadMovieById(movieId));
        dispatch(loadMovieCast(movieId));
        dispatch(loadSimilarMovies(movieId));
    }, [dispatch, id]);

    const movie = useAppSelector(state => state.movie.movie);
    const cast = useAppSelector(state => state.movie.cast);
    const similar = useAppSelector(state => state.movie.similar);

    if (!movie) {
        return (
            <Container id="content" sx={{ mt: CONTENT_MARGIN_TOP }}>
                <div className={css.loadingState}>
                    <div className={css.posterSkeleton} />
                    <div className={css.detailsSkeleton}>
                        <div className={css.titleSkeleton} />
                        <div className={css.infoSkeleton} />
                        <div className={css.textSkeleton} />
                        <div className={css.textSkeleton} />
                    </div>
                </div>
            </Container>
        );
    }

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        : noPoster;

    return (
        <Container id="content" sx={{ mt: CONTENT_MARGIN_TOP }}>
            <Button variant="contained" size="small" onClick={() => navigate(-1)}>
                <ReplyIcon />
            </Button>

            <hr />

            <Grid container spacing={GRID_SPACING}>
                <Grid size={GRID_SIZE_POSTER}>
                    <img src={posterUrl} alt={movie.title} />
                </Grid>
                <Grid size={GRID_SIZE_DETAILS}>
                    <h1 className={css.title}>{movie.title}</h1>
                    <div className={css.info}>
                        <p>Release year: {new Date(movie.release_date).getFullYear()}</p>

                        <span
                            className={css.average}
                            style={{
                                backgroundColor: getRatingColor(movie.vote_average),
                            }}
                        >
                            {movie.vote_average.toFixed(RATING_DECIMAL_PLACES)}
                        </span>

                        <p>Runtime: {runtimeConverter(movie.runtime)}</p>
                    </div>

                    <p className={css.text}>{movie.overview}</p>

                    <ul className={css.genres}>
                        {movie.genres.map(el => (
                            <li key={el.id} className={css.genre}>
                                {el.name}
                            </li>
                        ))}
                    </ul>
                </Grid>
            </Grid>

            <Grid container spacing={GRID_SPACING}>
                {cast && cast.length > 0 && (
                    <>
                        <h2>In the cast</h2>
                        {[...cast]
                            .sort((a, b) => b.popularity - a.popularity)
                            .slice(0, PREVIEW_ITEMS_COUNT)
                            .map(actor => (
                                <Grid key={actor.id} size={GRID_SIZE_MOVIE_CARD}>
                                    <div className={css.item}>
                                        <img
                                            className={css.photo}
                                            src={
                                                actor.profile_path
                                                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                                                    : noPhoto
                                            }
                                            alt={actor.name}
                                        />
                                        <p className={css.name}>{actor.name}</p>
                                        <p className={css.character}>{actor.character}</p>
                                    </div>
                                </Grid>
                            ))}
                    </>
                )}
            </Grid>

            <Grid container spacing={GRID_SPACING}>
                {similar && similar.length > 0 && (
                    <>
                        <h2>Similar movies</h2>
                        {similar.slice(0, PREVIEW_ITEMS_COUNT).map(m => (
                            <Grid key={m.id} size={GRID_SIZE_MOVIE_CARD}>
                                <MovieCard movie={m} />
                            </Grid>
                        ))}
                    </>
                )}
            </Grid>
        </Container>
    );
};
