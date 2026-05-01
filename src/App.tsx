import { useEffect } from 'react';

import { getBackdropUrl } from './api/api';
import { Header } from './Header/Header';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { loadRandomPosterMovie } from './store/posterSlice';

import './less/App.less';
import { loadPopularMovies } from './store/popSlice';
import { Container } from '@mui/material';

export const App = () => {
    const dispatch = useAppDispatch();

    const {movie: heroMovie, loading, error} = useAppSelector((state) => state.poster);

    useEffect(() => {
        dispatch(loadRandomPosterMovie());
        dispatch(loadPopularMovies())
    }, [dispatch]);

    return (
        <div>
            <Header />

            {loading && <div className="poster">Загрузка...</div>}

            {error && (
                <div className="poster">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <div
                    className="poster"
                    style={{
                        backgroundImage: heroMovie?.backdrop_path
                            ? `linear-gradient(
                                rgba(0, 0, 0, 0.45),
                                rgba(0, 0, 0, 0.85)
                            ), url(${getBackdropUrl(heroMovie.backdrop_path)})`
                            : undefined,
                    }}
                />
            )}

            <Container>
                <h2 className='title title_second'>Popular Movies</h2>
            </Container>
        </div>
    );
};
