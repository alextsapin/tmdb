/* eslint-disable react/destructuring-assignment */
import { JSX } from 'react';

import { Movie } from '../api/api';
import like from '../images/like-red.png';
import noLike from '../images/like.png';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import css from './like.module.less';

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
