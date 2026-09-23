/* eslint-disable react/destructuring-assignment */
import { JSX, useState } from 'react';

import { Link } from 'react-router-dom';

import { ImageLoader } from '@/shared/ui/image-loader';

import noImage from '../../assets/no-poster.webp';
import { getRatingColor } from '../../lib/getRatingColor';
import { RATING_DECIMAL_PLACES } from '../../model/constants';
import { Movie } from '../../model/types';

import css from './card.module.less';

export const Card = (props: Movie): JSX.Element => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const posterUrl = props.poster_path
        ? `https://image.tmdb.org/t/p/w300${props.poster_path}`
        : noImage;

    return (
        <>
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

            {imageLoaded && (
                <div className={css.title} title={props.title}>
                    {props.title}
                </div>
            )}
        </>
    );
};
