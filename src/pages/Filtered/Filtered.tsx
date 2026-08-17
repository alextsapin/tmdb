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
} from '@mui/material';

import { MovieSort } from '../../api/api';
import { Card } from '../../Card/Card';
import {
    loadFilteredMovies,
    setSortBy,
    setVoteAverageGte,
    setVoteAverageLte,
} from '../../store/filteredSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import css from './filtered.module.less';

export const FilteredMovies = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const sortBy = useAppSelector(state => state.filtered.sortBy);
    const voteAverageGte = useAppSelector(state => state.filtered.voteAverageGte);
    const voteAverageLte = useAppSelector(state => state.filtered.voteAverageLte);

    const handleSortChange = (value: MovieSort): void => {
        dispatch(setSortBy(value));
    };

    const handleRatingChange = (_event: Event, value: number | number[]): void => {
        const [min, max] = value as number[];

        dispatch(setVoteAverageGte(min));
        dispatch(setVoteAverageLte(max));
    };

    const movies = useAppSelector(state => state.filtered.movies);
    const loading = useAppSelector(state => state.filtered.loading);
    const error = useAppSelector(state => state.filtered.error);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(
                loadFilteredMovies({
                    page: 1,
                    sortBy,
                    voteAverageGte,
                    voteAverageLte,
                    withGenres: [],
                }),
            );
        }, 200);

        return () => clearTimeout(timer);
    }, [dispatch, sortBy, voteAverageGte, voteAverageLte]);

    return (
        <Container id="content">
            <h1>Filtered Movies</h1>

            <div className={css.layout}>
                <aside className={css.filters}>
                    <h2>Filters</h2>

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
                    </FormControl>
                </aside>

                <section className={css.results}>
                    <h2>Results</h2>

                    {loading && <p>Loading movies...</p>}

                    {!loading && !error && movies.length === 0 && <p>No movies found</p>}

                    {!loading && movies.length > 0 && (
                        <Grid container columnSpacing={2} rowSpacing={4}>
                            {movies.map(movie => (
                                <Card key={movie.id} {...movie} />
                            ))}
                        </Grid>
                    )}
                </section>
            </div>
        </Container>
    );
};
