/* eslint-disable no-magic-numbers */

/** HTTP status codes */
export const HTTP_UNAUTHORIZED = 401;
export const HTTP_NOT_FOUND = 404;
export const HTTP_INTERNAL_SERVER_ERROR = 500;
export const HTTP_BAD_GATEWAY = 502;
export const HTTP_SERVICE_UNAVAILABLE = 503;
export const HTTP_GATEWAY_TIMEOUT = 504;

/** Rating */
export const RATING_HIGH_THRESHOLD = 7;
export const RATING_MEDIUM_THRESHOLD = 4;
export const RATING_MIN = 0;
export const RATING_MAX = 10;
export const RATING_STEP = 0.1;
export const RATING_DECIMAL_PLACES = 1;

/** Time */
export const MINUTES_PER_HOUR = 60;

/** UI timings */
export const SNACKBAR_AUTO_HIDE_MS = 5000;
export const FILTER_DEBOUNCE_MS = 200;

/** Lists / pagination */
export const PAGINATOR_FIRST_PAGE = 1;
export const PAGINATOR_SECTION_SIZE = 5;
export const PAGINATOR_PAGE_STEP = 1;
export const TMDB_MAX_PAGE = 500;
export const PREVIEW_ITEMS_COUNT = 6;

/** MUI layout */
export const GRID_SPACING = 2;
export const GRID_COLUMN_SPACING = 2;
export const GRID_ROW_SPACING = 4;
export const CONTENT_MARGIN_TOP = 5;
export const BUTTON_MARGIN_TOP = 3;
export const GRID_SIZE_POSTER = 3;
export const GRID_SIZE_DETAILS = 9;
export const GRID_SIZE_SKELETON = 2;

export const GRID_SIZE_MOVIE_CARD = { xs: 12, sm: 6, md: 4, lg: 2 } as const;
export const GRID_SIZE_FILTERED_CARD = { xs: 12, sm: 6, md: 4, lg: 3 } as const;

/** TMDB genre ids */
export const GENRES = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
] as const;
