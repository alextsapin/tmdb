/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGI3YmNkZTYwMmE2ODIxM2Y3MWI5YjUwNTU1Mjk2YSIsIm5iZiI6MTc3NzI4ODgzOC4xNzYsInN1YiI6IjY5ZWY0Njg2OWRlYTczNDZlNDZiMjIxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hOoajQFmbun0U6uQzNt2nver0jrFoJmnyL0gyrtqfZ0';

export const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        accept: 'application/json',
    },
    params: {
        language: 'ru-RU',
    },
});

export type Movie = {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
};

type PopularMoviesResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

export const getPopularMovies = async (page = 1) => {
    const response = await tmdbApi.get<PopularMoviesResponse>('/movie/popular', {
        params: {
            page,
        },
    });

    return response.data.results;
};

export const getBackdropUrl = (path: string | null) => {
    if (!path) return '';
    return `https://image.tmdb.org/t/p/original${path}`;
};


