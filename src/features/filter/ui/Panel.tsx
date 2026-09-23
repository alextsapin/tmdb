import { JSX } from 'react';

import { Button, FormControl, InputLabel, MenuItem, Select, Slider } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/App/store/hooks';
import { MovieSort } from '@/entities/movie';
import {
    GENRES,
    RATING_DECIMAL_PLACES,
    RATING_MAX,
    RATING_MIN,
    RATING_STEP,
} from '@/shared/constants';

import {
    resetFilters,
    setSortBy,
    setVoteAverageGte,
    setVoteAverageLte,
    toggleGenre,
} from '../model/filterSlice';

import css from './panel.module.less';

export const Panel = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const sortBy = useAppSelector(state => state.filtered.sortBy);
    const voteAverageGte = useAppSelector(state => state.filtered.voteAverageGte);
    const voteAverageLte = useAppSelector(state => state.filtered.voteAverageLte);
    const withGenres = useAppSelector(state => state.filtered.withGenres);

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

    return (
        <aside className={css.filters}>
            <FormControl fullWidth className={css.sortControl}>
                <InputLabel id="sort-label">Sort by</InputLabel>
                <Select
                    labelId="sort-label"
                    value={sortBy}
                    label="Sort by"
                    onChange={event => handleSortChange(event.target.value as MovieSort)}
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
                    <MenuItem value="primary_release_date.desc">Release date ↓</MenuItem>
                    <MenuItem value="primary_release_date.asc">Release date ↑</MenuItem>
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
    );
};
