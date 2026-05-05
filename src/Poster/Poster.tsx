import { Movie } from '../api/api';
import { useAppSelector } from '../store/hooks';
import spinner from '../images/spinner.gif';
import css from './poster.module.less';

type PosterProps = {
    movies: Movie[]
}

export const Poster = (props: PosterProps) => {

    const {loading, error} = useAppSelector((state) => state.pop);
    const moviesWithBackdrop = props.movies.filter((movie) => movie.backdrop_path);
    const randomIndex = Math.floor(Math.random() * moviesWithBackdrop.length);
    const randomMovie = moviesWithBackdrop[randomIndex];

    if(loading) {
        return (
            <div className={css.poster}>
                <img className={css.spinner} src={spinner} alt="spinner"/>
            </div>
        )
    } 

    if(error) return <div className={css.poster}>{error}</div> 
    
    return (
        <div className={css.poster}
            style={{
                backgroundImage: randomMovie?.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/original${randomMovie.backdrop_path})`
                    : undefined,
            }}
        />
    )
}
