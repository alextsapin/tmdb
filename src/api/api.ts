/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import axios, { AxiosError } from 'axios';

import {
    HTTP_BAD_GATEWAY,
    HTTP_GATEWAY_TIMEOUT,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_NOT_FOUND,
    HTTP_SERVICE_UNAVAILABLE,
    HTTP_UNAUTHORIZED,
} from '../constants';

const TMDB_ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGI3YmNkZTYwMmE2ODIxM2Y3MWI5YjUwNTU1Mjk2YSIsIm5iZiI6MTc3NzI4ODgzOC4xNzYsInN1YiI6IjY5ZWY0Njg2OWRlYTczNDZlNDZiMjIxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hOoajQFmbun0U6uQzNt2nver0jrFoJmnyL0gyrtqfZ0';

export const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        accept: 'application/json',
    },
    params: {
        language: 'en',
    },
});

tmdbApi.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
        if (!error.response) {
            return Promise.reject(new Error('No internet connection...'));
        }

        switch (error.response.status) {
            case HTTP_UNAUTHORIZED:
                return Promise.reject(new Error('API authorization error...'));
            case HTTP_NOT_FOUND:
                return Promise.reject(new Error('Requested resource not found...'));
            case HTTP_INTERNAL_SERVER_ERROR:
            case HTTP_BAD_GATEWAY:
            case HTTP_SERVICE_UNAVAILABLE:
            case HTTP_GATEWAY_TIMEOUT:
                return Promise.reject(new Error('Server error. Please try again later...'));
            default:
                return Promise.reject(new Error('An error occurred while requesting the API...'));
        }
    },
);

export type MovieCategory = 'popular' | 'top' | 'upcoming' | 'nowPlaying';

export type MovieSort =
    | 'popularity.desc'
    | 'popularity.asc'
    | 'vote_average.desc'
    | 'vote_average.asc'
    | 'primary_release_date.desc'
    | 'primary_release_date.asc'
    | 'title.asc'
    | 'title.desc';

export type DiscoverMovieParams = {
    page?: number;
    sortBy: MovieSort;
    voteAverageGte?: number;
    voteAverageLte?: number;
    withGenres?: number[];
};

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

export type MovieDetails = Movie & {
    runtime: number;
    genres: {
        id: number;
        name: string;
    }[];
};

export type MoviesResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

export type Actor = {
    id: number;
    name: string;
    popularity: number;
    profile_path: string;
    character: string;
};

export type MovieCast = {
    id: number;
    cast: Actor[];
};

// Получение фильмов по категории
export const getMoviesByCategory = async (
    category: MovieCategory,
    page = 1,
): Promise<MoviesResponse> => {
    const { data } = await tmdbApi.get<MoviesResponse>(categoryEndpoints[category], {
        params: { page },
    });

    return data;
};

// Поиск фильмов
export const searchMovies = async (query: string, page = 1): Promise<MoviesResponse> => {
    const { data } = await tmdbApi.get<MoviesResponse>('/search/movie', {
        params: { query, page },
    });

    return data;
};

// Получение фильма по ID
export const getMovieById = async (id: number): Promise<MovieDetails> => {
    const { data } = await tmdbApi.get<MovieDetails>(`/movie/${id}`);

    return data;
};

// Получение актеров фильма
export const getMovieCast = async (id: number): Promise<Actor[]> => {
    const { data } = await tmdbApi.get<MovieCast>(`/movie/${id}/credits`);

    return data.cast;
};

// Получение похожих фильмов
export const getSimilarMovies = async (id: number): Promise<Movie[]> => {
    const { data } = await tmdbApi.get<MoviesResponse>(`/movie/${id}/similar`);

    return data.results;
};

// Получение фильмов по параметрам
export const discoverMovies = async (
    params: DiscoverMovieParams,
): Promise<MoviesResponse> => {
    const { data } = await tmdbApi.get<MoviesResponse>('/discover/movie', {
        params: {
            page: params.page || 1,
            sort_by: params.sortBy,
            vote_average_gte: params.voteAverageGte,
            vote_average_lte: params.voteAverageLte,
            with_genres: params.withGenres?.join(','),
        },
    });

    return data;
};
