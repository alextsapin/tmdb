/* eslint-disable react/destructuring-assignment */
import { JSX, useEffect, useMemo, useState } from 'react';

import Container from '@mui/material/Container';

import { Movie } from '@/entities/movie';
import { SearchForm } from '@/features/search-movies';
import css from '@/Poster/poster.module.less';

type PosterProps = {
    movies: Movie[];
};

export const Poster = ({ movies }: PosterProps): JSX.Element => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const randomMovie = useMemo(() => {
        const moviesWithBackdrop = movies.filter(movie => movie.backdrop_path);

        if (!moviesWithBackdrop.length) {
            return undefined;
        }

        const randomIndex = Math.floor(Math.random() * moviesWithBackdrop.length);

        return moviesWithBackdrop[randomIndex];
    }, [movies]);

    useEffect(() => {
        if (!randomMovie?.backdrop_path) return;

        let cancelled = false;

        setImageLoaded(false);

        const image = new Image();

        image.src = `https://image.tmdb.org/t/p/w1280${randomMovie.backdrop_path}`;

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

    return (
        <div className={css.poster}>
            <div
                className={`${css.background} ${!imageLoaded ? css.isLoading : ''}`}
                style={{
                    backgroundImage: randomMovie?.backdrop_path
                        ? `url(https://image.tmdb.org/t/p/w1280${randomMovie.backdrop_path})`
                        : undefined,
                }}
            />

            <Container className={css.wrapper}>
                <SearchForm />
            </Container>
        </div>
    );
};
