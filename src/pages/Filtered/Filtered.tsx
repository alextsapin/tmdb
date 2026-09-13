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

import { MovieSort } from '@/api/api';
import { Card } from '@/Card/Card';
import css from '@/pages/Filtered/filtered.module.less';
import { Paginator } from '@/Paginator/Paginator';
import {
    FILTER_DEBOUNCE_MS,
    GENRES,
    GRID_COLUMN_SPACING,
    GRID_ROW_SPACING,
    GRID_SIZE_FILTERED_CARD,
    RATING_DECIMAL_PLACES,
    RATING_MAX,
    RATING_MIN,
    RATING_STEP,
} from '@/shared/constants';
import {
    loadFilteredMovies,
    resetFilters,
    setSortBy,
    setVoteAverageGte,
    setVoteAverageLte,
    toggleGenre,
} from '@/store/filteredSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export const FilteredMovies = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const sortBy = useAppSelector(state => state.filtered.sortBy);
    const voteAverageGte = useAppSelector(state => state.filtered.voteAverageGte);
    const voteAverageLte = useAppSelector(state => state.filtered.voteAverageLte);
    const withGenres = useAppSelector(state => state.filtered.withGenres);
    const movies = useAppSelector(state => state.filtered.movies);
    const loading = useAppSelector(state => state.filtered.loading);
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
        }, FILTER_DEBOUNCE_MS);

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
                                    {voteAverageGte.toFixed(RATING_DECIMAL_PLACES)} –{' '}
                                    {voteAverageLte.toFixed(RATING_DECIMAL_PLACES)}
                                </span>
                            </div>
                            <Slider
                                value={[voteAverageGte, voteAverageLte]}
                                onChange={handleRatingChange}
                                min={RATING_MIN}
                                max={RATING_MAX}
                                step={RATING_STEP}
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <div className={css.genres}>
                            <div className={css.genreTitle}>Genres</div>
                            <div className={css.genreList}>
                                {GENRES.map(genre => (
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

                    {!loading && movies.length === 0 && <p>No movies found</p>}

                    {movies.length > 0 && (
                        <Grid
                            container
                            columnSpacing={GRID_COLUMN_SPACING}
                            rowSpacing={GRID_ROW_SPACING}
                        >
                            {movies.map(movie => (
                                <Grid key={movie.id} size={GRID_SIZE_FILTERED_CARD}>
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
                </section>
            </div>
        </Container>
    );
};
