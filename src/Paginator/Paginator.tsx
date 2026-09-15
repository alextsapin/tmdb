/* eslint-disable prettier/prettier */
import { JSX } from 'react';

import { Button } from '@mui/material';

import css from '@/Paginator/paginator.module.less';
import {
    PAGINATOR_FIRST_PAGE,
    PAGINATOR_PAGE_STEP,
    PAGINATOR_SECTION_SIZE,
    TMDB_MAX_PAGE,
} from '@/shared/constants';

type PaginatorProps = {
    totalPages: number;
    page: number;
    onPageChange: (page: number) => void;
};

export const Paginator = ({totalPages, page, onPageChange}: PaginatorProps): JSX.Element => {
    const maxPage = Math.min(TMDB_MAX_PAGE, totalPages);
    // eslint-disable-next-line no-magic-numbers -- half of visible page window
    const halfWindow = Math.floor(PAGINATOR_SECTION_SIZE / 2);

    let leftPage = page - halfWindow;
    let rightPage = page + halfWindow;

    if (leftPage < PAGINATOR_FIRST_PAGE) {
        rightPage += PAGINATOR_FIRST_PAGE - leftPage;
        leftPage = PAGINATOR_FIRST_PAGE;
    }

    if (rightPage > maxPage) {
        leftPage -= rightPage - maxPage;
        rightPage = maxPage;
    }

    if (leftPage < PAGINATOR_FIRST_PAGE) {
        leftPage = PAGINATOR_FIRST_PAGE;
    }

    const pages: number[] = [];

    for (let i = leftPage; i <= rightPage; i += PAGINATOR_PAGE_STEP) {
        pages.push(i);
    }

    return (
        <div className={css.paginator}>
            {leftPage > PAGINATOR_FIRST_PAGE && (
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

            {pages.map(p =>
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

            {rightPage < maxPage && (
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
