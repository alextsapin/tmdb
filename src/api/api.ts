/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGI3YmNkZTYwMmE2ODIxM2Y3MWI5YjUwNTU1Mjk2YSIsIm5iZiI6MTc3NzI4ODgzOC4xNzYsInN1YiI6IjY5ZWY0Njg2OWRlYTczNDZlNDZiMjIxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hOoajQFmbun0U6uQzNt2nver0jrFoJmnyL0gyrtqfZ0';

export type MovieCategory =
    | 'popular'
    | 'top'
    | 'upcoming'
    | 'nowPlaying';

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

const categoryEndpoints: Record<MovieCategory, string> = {
    popular: '/movie/popular',
    top: '/movie/top_rated',
    upcoming: '/movie/upcoming',
    nowPlaying: '/movie/now_playing',
};

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

export type MoviesResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

// Получение фильмов по категории
export const getMoviesByCategory = async (category: MovieCategory, page = 1): Promise<MoviesResponse> => {
    const { data } = await tmdbApi.get<MoviesResponse>(categoryEndpoints[category], { params: { page } });
    return data;
};

// Поиск фильмов
export const searchMovies = async (query: string, page = 1): Promise<MoviesResponse> => {
    const { data } = await tmdbApi.get<MoviesResponse>('/search/movie', {params: { query, page }});
    console.log(data);
    return data;
};
