import { JSX } from 'react';

import { Button, Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import css from './category.module.less';

type CategoryKey = 'popular' | 'top' | 'upcoming' | 'nowPlaying';

const categories: { key: CategoryKey; label: string }[] = [
    { key: 'popular', label: 'Popular' },
    { key: 'top', label: 'Top Rated' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'nowPlaying', label: 'Now Playing' },
];

export const Category = (): JSX.Element => {
    const [searchParams, setSearchParams] = useSearchParams();

    const category = (searchParams.get('category') as CategoryKey) || 'popular';

    return (
        <Container id="content">
            <h1>Category Movies</h1>

            <div className={css.buttons}>
                {categories.map(item => (
                    <Button
                        key={item.key}
                        variant="contained"
                        onClick={() => setSearchParams({ category: item.key })}
                        disabled={category === item.key}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>
        </Container>
    );
};
