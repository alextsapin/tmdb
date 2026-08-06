/* eslint-disable react/destructuring-assignment */
import { JSX, useEffect, useState } from 'react';

import Container from '@mui/material/Container';

import { Movie } from '../api/api';
import { SearchForm } from '../SearchForm/SearchForm';
import { useAppSelector } from '../store/hooks';

import css from './poster.module.less';

type PosterProps = {
    movies: Movie[];
};

export const Poster = ({ movies }: PosterProps): JSX.Element => {
    const error = useAppSelector(state => state.movies.error.popular);

    const moviesWithBackdrop = movies.filter(movie => movie.backdrop_path);
    const randomIndex = Math.floor(Math.random() * moviesWithBackdrop.length);
    const randomMovie = moviesWithBackdrop[randomIndex];

    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if (!randomMovie?.backdrop_path) return;

        let cancelled = false;

        setImageLoaded(false);

        const image = new Image();

        image.src = `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`;

        image.onload = () => {
            if (!cancelled) {
                requestAnimationFrame(() => {
                    setImageLoaded(true);
                });
            }
        };

        return () => {
            cancelled = true;
        };
    }, [randomMovie]);

    if (error) return <div className={css.poster}>{error}</div>;

    return (
        <div className={css.poster}>
            <div
                className={`${css.background} ${!imageLoaded ? css.isLoading : ''}`}
                style={{
                    backgroundImage: randomMovie?.backdrop_path
                        ? `url(https://image.tmdb.org/t/p/original${randomMovie.backdrop_path})`
                        : undefined,
                }}
            />

            <Container className={css.wrapper}>
                <SearchForm />
            </Container>
        </div>
    );
};
