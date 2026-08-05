/* eslint-disable react/destructuring-assignment */
import { JSX } from 'react';

import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import { Movie } from '../api/api';
import noImage from '../images/no-image-available.webp';
import { Like } from '../Like/Like';
import { getRatingColor } from '../utils/utils';

import css from './card.module.less';

export const Card = (props: Movie): JSX.Element => {
    const posterUrl = props.poster_path
        ? `https://image.tmdb.org/t/p/original${props.poster_path}`
        : noImage;

    return (
        <Grid className={css.card} size={2}>
            <Like {...props} />
            <Link className={css.link} to={`/movie/${props.id}`}>
                <img src={posterUrl} alt={props.title} />
                <span
                    className={css.average}
                    style={{ backgroundColor: getRatingColor(props.vote_average) }}
                >
                    {props.vote_average.toFixed(1)}
                </span>
            </Link>
            <div className={css.title} title={props.title}>
                {props.title}
            </div>
        </Grid>
    );
};
