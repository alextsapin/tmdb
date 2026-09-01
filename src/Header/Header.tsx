import { JSX } from 'react';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton } from '@mui/material';
import Container from '@mui/material/Container';
import { Link, NavLink } from 'react-router-dom';

import logo from '../images/tmdb.png';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleTheme } from '../store/themeSlice';

import css from './header.module.less';

export const Header = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const themeMode = useAppSelector(state => state.theme.mode);

    return (
        <header className={css.header}>
            <Container className={css.wrapper}>
                <Link className={css.logo} to="/">
                    <img src={logo} alt="logo" />
                </Link>

                <ul className={css.menu}>
                    <li className={css.item}>
                        <NavLink to="/" className={css.link}>
                            Main
                        </NavLink>
                    </li>

                    <li className={css.item}>
                        <NavLink to="/category-movies/" className={css.link}>
                            Category movies
                        </NavLink>
                    </li>

                    <li className={css.item}>
                        <NavLink to="/filtered-movies/" className={css.link}>
                            Filtered Movies
                        </NavLink>
                    </li>

                    <li className={css.item}>
                        <NavLink to="/search/" className={css.link}>
                            Search
                        </NavLink>
                    </li>

                    <li className={css.item}>
                        <NavLink to="/favorites/" className={css.link}>
                            Favorites
                        </NavLink>
                    </li>
                </ul>

                <IconButton
                    className={css.switcher}
                    aria-label="toggle theme"
                    onClick={() => dispatch(toggleTheme())}
                    color="inherit"
                >
                    {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
            </Container>
        </header>
    );
};
