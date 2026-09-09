/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { JSX } from 'react';

import { Button } from '@mui/material';

import { PAGINATOR_SECTION_SIZE } from '../constants';

import css from './paginator.module.less';

type PaginatorProps = {
    totalPages: number;
    page: number;
    onPageChange: (page: number) => void;
};

export const Paginator = ({
    totalPages,
    page,
    onPageChange,
}: PaginatorProps): JSX.Element => {
    const pages = [];

    for (let i = 1; i <= totalPages; i += 1) {
        pages.push(i);
    }

    const sectionNumber = Math.ceil(page / PAGINATOR_SECTION_SIZE);

    // Leftmost page of the section
    const leftPage = (sectionNumber - 1) * PAGINATOR_SECTION_SIZE + 1;
    // Rightmost page of the section
    const rightPage = sectionNumber * PAGINATOR_SECTION_SIZE;

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
