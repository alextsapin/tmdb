/* eslint-disable no-magic-numbers */
import { JSX } from 'react';

import { Button } from '@mui/material';

import css from './paginator.module.less';

type PaginatorProps = {
    totalResults: number;
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
};

export const Paginator = ({
    totalResults,
    totalPages,
    page,
    setPage,
}: PaginatorProps): JSX.Element => {
    const pages = [];

    for (let i = 1; i < totalPages; i += 1) {
        pages.push(i);
    }

    const sectionNumber = Math.ceil(page / 5);

    // Крайняя левая страница
    const leftPage = (sectionNumber - 1) * 5 + 1;
    // Крайняя правая страница
    const rightPage = sectionNumber * 5;

    return (
        <div className={css.paginator}>
            {page > 1 && (
                <Button variant="contained" onClick={() => setPage(page - 1)}>
                    -1
                </Button>
            )}

            {pages
                .filter(p => Number(p) >= leftPage && Number(p) <= rightPage)
                .map(p =>
                    p === page ? (
                        <Button key={p} variant="contained" disabled>
                            {p}
                        </Button>
                    ) : (
                        <Button key={p} variant="contained" onClick={() => setPage(p)}>
                            {p}
                        </Button>
                    ),
                )}

            {page < Math.ceil(totalResults / 20) && (
                <Button variant="contained" onClick={() => setPage(page + 1)}>
                    +1
                </Button>
            )}
        </div>
    );
};
