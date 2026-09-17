/* eslint-disable react/destructuring-assignment */
import { JSX, useState } from 'react';

import { Link } from 'react-router-dom';

import noImage from '@/images/no-poster.webp';
import { RATING_DECIMAL_PLACES } from '@/shared/constants';
import { ImageLoader } from '@/shared/ui/image-loader';
import { getRatingColor } from '@/utils/utils';

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
