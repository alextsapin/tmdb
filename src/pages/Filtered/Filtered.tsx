import { JSX } from 'react';

import { Container } from '@mui/material';

import css from './filtered.module.less';

export const FilteredMovies = (): JSX.Element => {
    return (
        <Container id="content">
            <h1>Filtered Movies</h1>

            <div className={css.layout}>
                <aside className={css.filters}>
                    <h2>Filters</h2>
                </aside>

                <section className={css.results}>
                    <h2>Results</h2>
                </section>
            </div>
        </Container>
    );
};
