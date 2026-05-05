import { Movie } from "../api/api";
import { useAppSelector } from "../store/hooks";

type PosterProps = {
    movies: Movie[]
}

export const Poster = (props: PosterProps) => {

    const {loading, error} = useAppSelector((state) => state.pop);
    const moviesWithBackdrop = props.movies.filter((movie) => movie.backdrop_path);
    const randomIndex = Math.floor(Math.random() * moviesWithBackdrop.length);
    const randomMovie = moviesWithBackdrop[randomIndex];
    
    return (
        <>
            {loading && <div className="poster">Загрузка...</div>}
            {error && <div className="poster">{error}</div>}

            {!loading && !error && (
                <div className="poster"
                    style={{
                        backgroundImage: randomMovie?.backdrop_path
                            ? `linear-gradient(
                                rgba(0, 0, 0, 0.45),
                                rgba(0, 0, 0, 0.85)
                            ), url(${`https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`})`
                            : undefined,
                    }}
                />
            )}
        </>
    )
}
