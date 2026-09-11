import { JSX, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import Container from '@mui/material/Container';
import { Link, NavLink } from 'react-router-dom';

import logo from '../images/tmdb.png';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleTheme } from '../store/themeSlice';

import css from './header.module.less';

const navItems = [
    { to: '/', label: 'Main' },
    { to: '/category-movies/', label: 'Category movies' },
    { to: '/filtered-movies/', label: 'Filtered Movies' },
    { to: '/search/', label: 'Search' },
    { to: '/favorites/', label: 'Favorites' },
] as const;

export const Header = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const themeMode = useAppSelector(state => state.theme.mode);
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = (): void => setMenuOpen(false);

    return (
        <header className={css.header}>
            <Container className={css.wrapper}>
                <Link className={css.logo} to="/" onClick={closeMenu}>
                    <img src={logo} alt="logo" />
                </Link>

                <IconButton
                    className={css.burger}
                    aria-label={menuOpen ? 'close menu' : 'open menu'}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(open => !open)}
                    color="inherit"
                >
                    {menuOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>

                <ul className={`${css.menu} ${menuOpen ? css.menuOpen : ''}`}>
                    {navItems.map(({ to, label }) => (
                        <li key={to} className={css.item}>
                            <NavLink to={to} className={css.link} onClick={closeMenu}>
                                {label}
                            </NavLink>
                        </li>
                    ))}
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
