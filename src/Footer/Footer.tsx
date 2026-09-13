import { JSX } from 'react';

import css from '@/Footer/footer.module.less';

export const Footer = (): JSX.Element => {
    return (
        <footer className={css.footer}>
            © 2026 Kinopoisk Demo · Data courtesy of TMDB.
        </footer>
    );
};
