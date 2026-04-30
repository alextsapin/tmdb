/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { getBackdropUrl, getPopularMovies, Movie } from './api/api';
import './App.css';
import { Header } from './Header/Header';

export const  App = () => {

    const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHeroMovie = async () => {
        try {
            const movies = await getPopularMovies(1);
            const moviesWithBackdrop = movies.filter((movie) => movie.backdrop_path);
            const randomIndex = Math.floor(Math.random() * moviesWithBackdrop.length);
            setHeroMovie(moviesWithBackdrop[randomIndex]);
        } catch (error) {
            console.error('Ошибка загрузки популярного фильма:', error);
        } finally {
            setLoading(false);
        }
        };

        loadHeroMovie();
    }, []);

    return (
        <div>
            <Header/>          

            <div className="hero"
                style={{
                backgroundImage: heroMovie?.backdrop_path
                    ? `linear-gradient(
                        rgba(0, 0, 0, 0.45),
                        rgba(0, 0, 0, 0.85)
                    ), url(${getBackdropUrl(heroMovie.backdrop_path)})`
                    : undefined,
                }}
            >
            </div>
        </div>
    );
}
