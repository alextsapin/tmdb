/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSX, useEffect } from 'react';

import {
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    Grid,
    Button,
} from '@mui/material';

import { MovieSort } from '../../api/api';
import { Card } from '../../Card/Card';
import { Paginator } from '../../Paginator/Paginator';
import { ErrorSnackbar } from '../../Snackbar/Snackbar';
import {
    clearError,
    loadFilteredMovies,
    resetFilters,
    setSortBy,
    setVoteAverageGte,
    setVoteAverageLte,
    toggleGenre,
} from '../../store/filteredSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import css from './filtered.module.less';

const genres = [
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
];

export const FilteredMovies = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const sortBy = useAppSelector(state => state.filtered.sortBy);
    const voteAverageGte = useAppSelector(state => state.filtered.voteAverageGte);
    const voteAverageLte = useAppSelector(state => state.filtered.voteAverageLte);
    const withGenres = useAppSelector(state => state.filtered.withGenres);
    const movies = useAppSelector(state => state.filtered.movies);
    const loading = useAppSelector(state => state.filtered.loading);
    const error = useAppSelector(state => state.filtered.error);
    const page = useAppSelector(state => state.filtered.page);
    const totalPages = useAppSelector(state => state.filtered.totalPages);

    const handleSortChange = (value: MovieSort): void => {
        dispatch(setSortBy(value));
    };

    const handleRatingChange = (_event: Event, value: number | number[]): void => {
        const [min, max] = value as number[];

        dispatch(setVoteAverageGte(min));
        dispatch(setVoteAverageLte(max));
    };

    const handleGenreChange = (genreId: number): void => {
        dispatch(toggleGenre(genreId));
    };

    const handlePageChange = (newPage: number): void => {
        dispatch(
            loadFilteredMovies({
                page: newPage,
                sortBy,
                voteAverageGte,
                voteAverageLte,
                withGenres,
            }),
        );
    };

    const handleCloseError = (): void => {
        dispatch(clearError());
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(
                loadFilteredMovies({
                    page: 1,
                    sortBy,
                    voteAverageGte,
                    voteAverageLte,
                    withGenres,
                }),
            );
        }, 200);

        return () => clearTimeout(timer);
    }, [dispatch, sortBy, voteAverageGte, voteAverageLte, withGenres]);

    return (
        <Container id="content">
            <h1>Filtered Movies</h1>

            <div className={css.layout}>
                <aside className={css.filters}>
                    <FormControl fullWidth className={css.sortControl}>
                        <InputLabel id="sort-label">Sort by</InputLabel>
                        <Select
                            labelId="sort-label"
                            value={sortBy}
                            label="Sort by"
                            onChange={event =>
                                handleSortChange(event.target.value as MovieSort)
                            }
                            MenuProps={{
                                classes: {
                                    paper: css.menuPaper,
                                },
                            }}
                        >
                            <MenuItem value="popularity.desc">Popularity ↓</MenuItem>
                            <MenuItem value="popularity.asc">Popularity ↑</MenuItem>
                            <MenuItem value="vote_average.desc">Rating ↓</MenuItem>
                            <MenuItem value="vote_average.asc">Rating ↑</MenuItem>
                            <MenuItem value="primary_release_date.desc">
                                Release date ↓
                            </MenuItem>
                            <MenuItem value="primary_release_date.asc">
                                Release date ↑
                            </MenuItem>
                            <MenuItem value="title.asc">Title A–Z</MenuItem>
                            <MenuItem value="title.desc">Title Z–A</MenuItem>
                        </Select>

                        <div className={css.ratingFilter}>
                            <div className={css.ratingHeader}>
                                <span>Rating</span>
                                <span>
                                    {voteAverageGte.toFixed(1)} –{' '}
                                    {voteAverageLte.toFixed(1)}
                                </span>
                            </div>
                            <Slider
                                value={[voteAverageGte, voteAverageLte]}
                                onChange={handleRatingChange}
                                min={0}
                                max={10}
                                step={0.1}
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <div className={css.genres}>
                            <div className={css.genreTitle}>Genres</div>
                            <div className={css.genreList}>
                                {genres.map(genre => (
                                    <Button
                                        key={genre.id}
                                        variant={
                                            withGenres.includes(genre.id)
                                                ? 'contained'
                                                : 'outlined'
                                        }
                                        color="primary"
                                        onClick={() => handleGenreChange(genre.id)}
                                    >
                                        {genre.name}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className={css.reset}>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => dispatch(resetFilters())}
                            >
                                Reset filters
                            </Button>
                        </div>
                    </FormControl>
                </aside>

                <section className={css.results}>
                    {loading && (
                        <div className={css.resultsLoading}>Loading movies...</div>
                    )}

                    {!loading && !error && movies.length === 0 && <p>No movies found</p>}

                    {movies.length > 0 && (
                        <Grid container columnSpacing={2} rowSpacing={4}>
                            {movies.map(movie => (
                                <Grid
                                    key={movie.id}
                                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                >
                                    <Card {...movie} />
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    {totalPages > 1 && (
                        <Paginator
                            totalPages={totalPages}
                            page={page}
                            onPageChange={handlePageChange}
                        />
                    )}

                    <ErrorSnackbar error={error} onClose={handleCloseError} />
                </section>
            </div>
        </Container>
    );
};
