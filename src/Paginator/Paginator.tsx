/* eslint-disable prettier/prettier */
import { JSX } from 'react';

import { Button } from '@mui/material';

import {
    PAGINATOR_FIRST_PAGE,
    PAGINATOR_PAGE_STEP,
    PAGINATOR_SECTION_SIZE,
    TMDB_MAX_PAGE,
} from '../constants';

import css from './paginator.module.less';

type PaginatorProps = {
    totalPages: number;
    page: number;
    onPageChange: (page: number) => void;
};

export const Paginator = ({totalPages, page, onPageChange}: PaginatorProps): JSX.Element => {
    const maxPage = Math.min(TMDB_MAX_PAGE, totalPages);

    const pages = [];

    for (let i = PAGINATOR_FIRST_PAGE; i <= maxPage; i += PAGINATOR_PAGE_STEP) {
        pages.push(i);
    }

    const sectionNumber = Math.ceil(page / PAGINATOR_SECTION_SIZE);

    // Leftmost page of the section
    const leftPage = (sectionNumber - PAGINATOR_PAGE_STEP) * PAGINATOR_SECTION_SIZE + PAGINATOR_FIRST_PAGE;
    // Rightmost page of the section
    const rightPage = Math.min(maxPage, sectionNumber * PAGINATOR_SECTION_SIZE);

    return (
        <div className={css.paginator}>
            {page > PAGINATOR_SECTION_SIZE && (
                <>
                    <Button
                        variant="outlined"
                        onClick={() => onPageChange(PAGINATOR_FIRST_PAGE)}
                    >
                        {PAGINATOR_FIRST_PAGE}
                    </Button>
                    ...
                </>
            )}

            {leftPage > PAGINATOR_SECTION_SIZE && (
                <>
                    <Button
                        variant="outlined"
                        onClick={() => onPageChange(leftPage - PAGINATOR_PAGE_STEP)}
                    >
                        {leftPage - PAGINATOR_PAGE_STEP}
                    </Button>
                    ...
                </>
            )}

            {pages
                .filter(p => Number(p) >= leftPage && Number(p) <= rightPage)
                .map(p =>
                    p === page ? (
                        <Button key={p} variant="contained">
                            {p}
                        </Button>
                    ) : (
                        <Button
                            key={p}
                            variant="outlined"
                            onClick={() => onPageChange(p)}
                        >
                            {p}
                        </Button>
                    ),
                )}

            {rightPage < maxPage && (
                <>
                    ...
                    <Button
                        variant="outlined"
                        onClick={() => onPageChange(rightPage + PAGINATOR_PAGE_STEP)}
                    >
                        {rightPage + PAGINATOR_PAGE_STEP}
                    </Button>
                </>
            )}

            {page <= maxPage - PAGINATOR_SECTION_SIZE && (
                <>
                    ...
                    <Button variant="outlined" onClick={() => onPageChange(maxPage)}>
                        {maxPage}
                    </Button>
                </>
            )}
        </div>
    );
};
