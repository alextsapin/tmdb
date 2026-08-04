/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from '@mui/material';
import { Movie } from '../api/api';
import css from './card.module.less';
import { Link } from 'react-router-dom';
import { Like } from '../Like/Like';
import noImage from '../images/no-image-available.webp'
import { getRatingColor } from '../utils/utils';

export const Card = (props: Movie) => {
    const posterUrl = props.poster_path ? `https://image.tmdb.org/t/p/original${props.poster_path}` : noImage;
    
    return (
        <Grid className={css.card} size={2}>
            <Link className={css.link} to={`/movie/${props.id}`}>
                <Like />
                <img src={posterUrl} alt={props.title} />
                <span className={css.average} style={{backgroundColor: getRatingColor(props.vote_average)}}>
                    {props.vote_average.toFixed(1)}
                </span>
            </Link>
            <div className={css.title} title={props.title}>{props.title}</div>
        </Grid>
    )
}
