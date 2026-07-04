import { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import css from './imageLoader.module.less';

type ImageLoaderProps = {
    src: string;
    alt: string;
    fallbackSrc?: string;
};

export const ImageLoader = ({ src, alt, fallbackSrc }: ImageLoaderProps) => {
    const [imageSrc, setImageSrc] = useState(src);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setImageSrc(src);
        setIsLoaded(false);
    }, [src]);

    return (
        <div className={css.wrapper}>
            {!isLoaded && (
                <div className={css.loader}>
                    <HashLoader
                        color="#1e88e5"
                        size={45}
                    />
                </div>
            )}

            <img className={`${css.image} ${isLoaded ? css.loaded : ''}`}
                src={imageSrc}
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                onError={() => {
                    if (fallbackSrc && imageSrc !== fallbackSrc) {
                        setImageSrc(fallbackSrc);
                    } else {
                        setIsLoaded(true);
                    }
                }}
            />
        </div>
    );
};
