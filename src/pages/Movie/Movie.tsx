import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadMovieById } from "../../store/movieSlice";
import { Container, Grid } from "@mui/material";
import { getRatingColor, runtimeConverter } from "../../utils/utils";
import noImage from '../../images/no-image-available.webp'
import css from "./movie.module.less";


export const MoviePage = () => {

    const { id } = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!id) return;
        dispatch(loadMovieById(Number(id)));
    }, [dispatch, id]);

    const movie = useAppSelector((state) => state.movie.movie);
    const loading = useAppSelector((state) => state.movie.loading);
    const error = useAppSelector((state) => state.movie.error);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!movie) return <p>Movie not found</p>;

    console.log(movie);


    const posterUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
    
    return (
        <Container id="content" sx={{ mt: 5 }}>
            <Grid container spacing={2}>
                <Grid size={3}>
                    <img src={posterUrl ?? noImage} alt={movie.title} />
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
                </Grid>
            </Grid>
        </Container>
        
    );
};
