import axios, { AxiosError } from 'axios';

import {
    HTTP_BAD_GATEWAY,
    HTTP_GATEWAY_TIMEOUT,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_NOT_FOUND,
    HTTP_SERVICE_UNAVAILABLE,
    HTTP_UNAUTHORIZED,
} from '@/shared/constants';

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
            if (!navigator.onLine) {
                return Promise.reject(new Error('No internet connection...'));
            }

            return Promise.reject(new Error('Network error. Please try again...'));
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
                return Promise.reject(
                    new Error('Server error. Please try again later...'),
                );
            default:
                return Promise.reject(
                    new Error('An error occurred while requesting the API...'),
                );
        }
    },
);
