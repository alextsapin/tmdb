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
