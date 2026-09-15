import { tmdbApi } from '@/shared/api/client';

import {
    Actor,
    DiscoverMovieParams,
    Movie,
    MovieCast,
    MovieCategory,
    MovieDetails,
    MoviesResponse,
} from '../model/types';

const categoryEndpoints: Record<MovieCategory, string> = {
    popular: '/movie/popular',
    top: '/movie/top_rated',
    upcoming: '/movie/upcoming',
    nowPlaying: '/movie/now_playing',
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
            'vote_average.gte': params.voteAverageGte,
            'vote_average.lte': params.voteAverageLte,
            with_genres: params.withGenres?.join(','),
        },
    });

    return data;
};
