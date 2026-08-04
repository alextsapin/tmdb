import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { Movie } from '../api/api';

import css from './like.module.less';
import noLike from '../images/like.png';
import like from '../images/like-red.png';

export const Like = (props: Movie) => {
    const dispatch = useAppDispatch();

    const favorites = useAppSelector(state => state.favorites.movies);
    const isFavorite = favorites.some(favorite => favorite.id === props.id);
    
    return (
        <button className={css.button} onClick={() => {
            if (isFavorite) {
                dispatch(removeFavorite(props.id));
            } else {
                dispatch(addFavorite({...props}));
            }
        }}>
            {isFavorite ? <img src={like} alt="like" /> : <img src={noLike} alt="no like" />}
        </button>
    )
}
