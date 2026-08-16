/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-magic-numbers */
import { JSX } from 'react';

import { Button } from '@mui/material';

import css from './paginator.module.less';

type PaginatorProps = {
    totalResults: number;
    totalPages: number;
    page: number;
    onPageChange: (page: number) => void;
};

export const Paginator = ({
    totalResults,
    totalPages,
    page,
    onPageChange,
}: PaginatorProps): JSX.Element => {
    const pages = [];

    for (let i = 1; i <= totalPages; i += 1) {
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
                <Button variant="contained" onClick={() => onPageChange(page - 1)}>
                    Prev
                </Button>
            )}

            {pages
                .filter(p => Number(p) >= leftPage && Number(p) <= rightPage)
                .map(p =>
                    p === page ? (
                        <Button key={p} variant="contained">
                            {p}
                        </Button>
                    ) : (
                        <Button key={p} variant="outlined" onClick={() => onPageChange(p)}>
                            {p}
                        </Button>
                    ),
                )}

            {page < totalPages && (
                <Button variant="contained" onClick={() => onPageChange(page + 1)}>
                    Next
                </Button>
            )}
        </div>
    );
};
