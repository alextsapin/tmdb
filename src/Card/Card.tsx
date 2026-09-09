/* eslint-disable react/destructuring-assignment */
import { JSX, useState } from 'react';

import { Link } from 'react-router-dom';

import { Movie } from '../api/api';
import { RATING_DECIMAL_PLACES } from '../constants';
import { ImageLoader } from '../ImageLoader/ImageLoader';
import noImage from '../images/no-poster.webp';
import { Like } from '../Like/Like';
import { getRatingColor } from '../utils/utils';

import css from './card.module.less';

export const Card = (props: Movie): JSX.Element => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const posterUrl = props.poster_path
        ? `https://image.tmdb.org/t/p/w300${props.poster_path}`
        : noImage;

    return (
        <div className={css.card}>
            <Link className={css.link} to={`/movie/${props.id}`}>
                <ImageLoader
                    src={posterUrl}
                    fallbackSrc={noImage}
                    onLoad={() => setImageLoaded(true)}
                    alt={props.title}
                />

                {imageLoaded && (
                    <span
                        className={css.average}
                        style={{
                            backgroundColor: getRatingColor(props.vote_average),
                        }}
                    >
                        {props.vote_average.toFixed(RATING_DECIMAL_PLACES)}
                    </span>
                )}
            </Link>
            {imageLoaded && <Like {...props} />}

            {imageLoaded && (
                <div className={css.title} title={props.title}>
                    {props.title}
                </div>
            )}
        </div>
    );
};
