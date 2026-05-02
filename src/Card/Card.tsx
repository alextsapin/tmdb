/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from '@mui/material';
import { Movie } from '../api/api';
import css from './card.module.less';
import { Link } from 'react-router-dom';

const getRatingColor = (rating: number) => {
    if (rating >= 7) {
        return '#21d07a'; // зелёный
    }

    if (rating >= 4) {
        return '#d2d531'; // жёлтый
    }

    if (rating > 0) {
        return '#db2360'; // красный
    }

    return '#666666'; // если рейтинга нет
};

export const Card = (props: Movie) => {
    return (
        <Grid className={css.card} size={2}>
            <Link to="/">
                <img src={`https://image.tmdb.org/t/p/original${props.poster_path}`} alt={props.title} />
            </Link>
            <span className={css.average} style={{backgroundColor: getRatingColor(props.vote_average)}}>{props.vote_average}</span>
        </Grid>
   
    )
}
