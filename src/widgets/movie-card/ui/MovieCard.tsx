import { JSX } from 'react';

import { Card, Movie } from '@/entities/movie';
import { Like } from '@/features/like-movie';

import css from './movie-card.module.less';

type MovieCardProps = {
    movie: Movie;
};

export const MovieCard = ({ movie }: MovieCardProps): JSX.Element => {
    return (
        <div className={css.card}>
            <Card {...movie} />
            <Like {...movie} />
        </div>
    );
};
