import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadMovieById } from "../../store/movieSlice";
import { Container } from "@mui/material";
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

    return (
        <Container id="content">
            <h1 className="title title_second">{movie.title}</h1>
        </Container>
        
    );
};
