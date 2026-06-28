import css from './paginator.module.less';
import { Button } from '@mui/material';

type PaginatorProps = {
    totalResults: number;
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
}

export const Paginator = ({ totalResults, totalPages, page, setPage }: PaginatorProps) => {
    const pages = [];

    for (let i = 1; i < totalPages; i++) {
        pages.push(i);
    }

    const sections = Math.ceil(totalPages / 5);

    console.log(sections);

    const sectionNumber  = Math.ceil(page / 5);

    // Крайняя левая страница
    const leftPage = (sectionNumber - 1) * 5 + 1;
    // Крайняя правая страница
    const rightPage = sectionNumber * 5;


    return (
        <div className={css.paginator}>
            {page > 1 && <Button variant="contained" onClick={() => setPage(page - 1)}>-1</Button>}

            {pages
            .filter(p => Number(p) >= leftPage && Number(p) <= rightPage)
            .map((p) => p === page 
                ? <Button key={p} variant="contained" disabled>{p}</Button>
                : <Button key={p} variant="contained" onClick={() => setPage(p)}>{p}</Button>
            )}

            {page < Math.ceil(totalResults / 20) && <Button variant="contained" onClick={() => setPage(page + 1)}>+1</Button>}
        </div>
    );
};
