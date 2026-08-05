/* eslint-disable react/destructuring-assignment */
import { JSX } from 'react';

import Container from '@mui/material/Container';

import { Movie } from '../api/api';
import spinner from '../images/spinner.gif';
import { SearchForm } from '../SearchForm/SearchForm';
import { useAppSelector } from '../store/hooks';

import css from './poster.module.less';

type PosterProps = {
    movies: Movie[];
};

export const Poster = ({ movies }: PosterProps): JSX.Element => {
    const loading = useAppSelector(state => state.movies.loading.popular);
    const error = useAppSelector(state => state.movies.error.popular);
    const moviesWithBackdrop = movies.filter(movie => movie.backdrop_path);
    const randomIndex = Math.floor(Math.random() * moviesWithBackdrop.length);
    const randomMovie = moviesWithBackdrop[randomIndex];

    if (loading) {
        return (
            <div className={css.poster}>
                <img className={css.spinner} src={spinner} alt="spinner" />
            </div>
        );
    }

    if (error) return <div className={css.poster}>{error}</div>;

    return (
        <div
            className={css.poster}
            style={{
                backgroundImage: randomMovie?.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/original${randomMovie.backdrop_path})`
                    : undefined,
            }}
        >
            <Container className={css.wrapper}>
                <SearchForm />
            </Container>
        </div>
    );
};
