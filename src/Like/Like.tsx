import { useState } from 'react';
import css from './like.module.less';

import noLike from '../images/like.png';
import like from '../images/like-red.png';

export const Like = () => {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <button className={css.button} onClick={() => setIsLiked(!isLiked)}>
            {isLiked ? <img src={like} alt="like" /> : <img src={noLike} alt="no like" />}
        </button>
    )
}
