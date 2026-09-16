/* eslint-disable prettier/prettier */
import { JSX, useState } from 'react';

import css from './image-loader.module.less';

type ImageLoaderProps = {
    src: string;
    alt: string;
    fallbackSrc?: string;
    onLoad?: () => void;
};

export const ImageLoader = ({src, alt, fallbackSrc, onLoad}: ImageLoaderProps): JSX.Element => {
    const [currentSrc, setCurrentSrc] = useState(src);
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={css.wrapper}>
            {!loaded && <div className={css.loader} />}

            <img
                className={`${css.image} ${loaded ? css.loaded : ''}`}
                src={currentSrc}
                alt={alt}
                onLoad={() => {
                    setLoaded(true);
                    onLoad?.();
                }}
                onError={() => {
                    if (fallbackSrc && currentSrc !== fallbackSrc) {
                        setCurrentSrc(fallbackSrc);
                    } else {
                        setLoaded(true);
                    }
                }}
            />
        </div>
    );
};
