/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-magic-numbers */
import { JSX, useEffect } from 'react';

import ReplyIcon from '@mui/icons-material/Reply';
import { Button, Container, Grid, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { Card } from '../../Card/Card';
import noImage from '../../images/unknown.png';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadMovieById, loadMovieCast, loadSimilarMovies } from '../../store/movieSlice';
import { getRatingColor, runtimeConverter } from '../../utils/utils';

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
    const error = useAppSelector(state => state.movie.error.movie);

    if (error) return <p>{error}</p>;

    if (!movie) {
        return (
            <Container id="content" sx={{ mt: 5 }}>
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
        : noImage;

    return (
        <Container id="content" sx={{ mt: 5 }}>
            <Button
                variant="contained"
                size="small"
                onClick={() => navigate(-1)}
            >
                <ReplyIcon />
            </Button>

            <hr />

            <Grid container spacing={2}>
                <Grid size={3}>
                    <img src={posterUrl} alt={movie.title} />
                </Grid>
                <Grid size={9}>
                    <h1 className={css.title}>{movie.title}</h1>
                    <div className={css.info}>
                        <p>Release year: {new Date(movie.release_date).getFullYear()}</p>

                        <span
                            className={css.average}
                            style={{
                                backgroundColor: getRatingColor(movie.vote_average),
                            }}
                        >
                            {movie.vote_average.toFixed(1)}
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

            <Grid container spacing={2}>
                {cast && cast.length > 0 && (
                    <>
                        <h2>In the cast</h2>
                        {[...cast]
                            .sort((a, b) => b.popularity - a.popularity)
                            .slice(0, 6)
                            .map(actor => (
                                <Grid
                                    key={actor.id}
                                    size={{ xs: 12, sm: 6, md: 4, lg: 2 }}
                                >
                                    <div className={css.item}>
                                        <img
                                            className={css.photo}
                                            src={
                                                actor.profile_path
                                                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                                                    : noImage
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

            <Grid container spacing={2}>
                {similar && similar.length > 0 && (
                    <>
                        <h2>Similar movies</h2>
                        {similar.slice(0, 6).map(m => (
                            <Grid key={m.id} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                                <Card {...m} />
                            </Grid>
                        ))}
                    </>
                )}
            </Grid>
        </Container>
    );
};
