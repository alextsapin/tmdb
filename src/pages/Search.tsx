import { useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { Card } from "../Card/Card";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadSearchMovies } from "../store/searchSlice";

export const SearchPage = () => {
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();

    const query = searchParams.get('query') || '';
    const page = Number(searchParams.get('page')) || 1;

    const movies = useAppSelector((state) => state.search.movies);
    const loading = useAppSelector((state) => state.search.loading);
    const error = useAppSelector((state) => state.search.error);
    const totalResults = useAppSelector((state) => state.search.totalResults);

    useEffect(() => {
        if (!query.trim()) return;

        dispatch(loadSearchMovies({query, page}));
    }, [dispatch, query, page]);

    console.log(movies);

    return (
        <Container id="content">
            <h1 className="title title_second">Search</h1>

            {!query && <p>Enter movie title</p>}

            {query && <p>Search results for: <strong>{query}</strong></p>}

            {loading && (
                <p>Loading...</p>
            )}

            {error && (
                <p>{error}</p>
            )}

            {!loading && query && totalResults === 0 && (
                <p>No movies found</p>
            )}

            {!loading && movies && movies.length > 0 && (
                <Grid container spacing={2}>
                    {movies.map((movie) => (
                        <Card key={movie.id} {...movie} />
                    ))}
                </Grid>
            )}
        </Container>
    );
};
