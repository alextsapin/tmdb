import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadMovieById, loadMovieCast, loadSimilarMovies } from "../../store/movieSlice";
import { Container, Grid } from "@mui/material";
import { getRatingColor, runtimeConverter } from "../../utils/utils";
import { Card } from "../../Card/Card";

import noImage from '../../images/no-image-available.webp'
import css from "./movie.module.less";

export const MoviePage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!id) return;
        const movieId = Number(id);
        dispatch(loadMovieById(movieId));
        dispatch(loadMovieCast(movieId));
        dispatch(loadSimilarMovies(movieId));
    }, [dispatch, id]);

    const movie = useAppSelector((state) => state.movie.movie);
    const cast = useAppSelector((state) => state.movie.cast);
    const similar = useAppSelector((state) => state.movie.similar);

    const loading = useAppSelector((state) => state.movie.loading.movie);
    const error = useAppSelector((state) => state.movie.error.movie);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!movie) return <p>Movie not found</p>;

    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : noImage;
    
    return (
        <Container id="content" sx={{mt: 5}}>
            <Grid container spacing={2}>
                <Grid size={3}>
                    <img src={posterUrl} alt={movie.title} />
                </Grid>
                <Grid size={9}>
                    <h1 className={css.title}>{movie.title}</h1>
                    <div className={css.info}>
                        <p>Release year: {new Date(movie.release_date).getFullYear()}</p>

                        <span className={css.average} style={{backgroundColor: getRatingColor(movie.vote_average)}}>
                            {movie.vote_average.toFixed(1)}
                        </span>

                        <p>Runtime: {runtimeConverter(movie.runtime)}</p>
                    </div>

                    <p className={css.text}>{movie.overview}</p>

                    <ul className={css.genres}>
                        {movie.genres.map(el => <li key={el.id} className={css.genre}>{el.name}</li>)}
                    </ul>
                </Grid>
            </Grid>

            <h2 className={css.title}>В ролях</h2>
            <Grid container spacing={2}>
                {cast && cast.length > 0 && (
                    <section className={css.cast}>
                        <ul className={css.list}>
                            {[...cast].sort((a, b) => b.popularity - a.popularity).slice(0, 6).map((actor) => (
                                <li key={actor.id} className={css.item}>
                                    <img className={css.photo} src={actor.profile_path ? `https://image.tmdb.org/t/p/original${actor.profile_path}` : noImage} alt={actor.name} />
                                    <p className={css.name}>{actor.name}</p>
                                    <p className={css.character}>{actor.character}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </Grid>
            
            <h2 className={css.title}>Похожие</h2>
            <Grid container spacing={2}>
                {similar && similar.length > 0 && (
                    
                    similar.slice(0, 6).map((m) => (
                        <Card key={m.id} {...m} />
                    ))
                )}
            </Grid>  
        </Container>
    );
};
