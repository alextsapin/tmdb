/* eslint-disable react/destructuring-assignment */
import { JSX } from 'react';

import { Movie } from '@/entities/movie';
import like from '@/images/like-red.png';
import noLike from '@/images/like.png';
import css from '@/Like/like.module.less';
import { addFavorite, removeFavorite } from '@/store/favoritesSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export const Like = (props: Movie): JSX.Element => {
    const dispatch = useAppDispatch();

    const favorites = useAppSelector(state => state.favorites.movies);
    const isFavorite = favorites.some(favorite => favorite.id === props.id);

    return (
        <button
            type="button"
            className={css.button}
            onClick={() => {
                if (isFavorite) {
                    dispatch(removeFavorite(props.id));
                } else {
                    dispatch(addFavorite({ ...props }));
                }
            }}
        >
            {isFavorite ? (
                <img src={like} alt="like" />
            ) : (
                <img src={noLike} alt="no like" />
            )}
        </button>
    );
};
