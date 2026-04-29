import Container from "@mui/material/Container";
import { Link, NavLink } from "react-router-dom";
import logo from '../images/tmdb.png';
import css from './header.module.css';

export const Header = () => {
    return (
        <Container className={css.header}>
            <Link to="/"><img src={logo} alt="logo"/></Link>

            <ul className={css.menu}>
                <li><NavLink to="/">Main</NavLink></li>
                <li><NavLink to="/category-movies/">Category movies</NavLink></li>
                <li><NavLink to="/filtered-movies/">Filtered Movies</NavLink></li>
                <li><NavLink to="/search/">Search</NavLink></li>
                <li><NavLink to="/favorites/">Favorites</NavLink></li>
            </ul>
        </Container>  
    );
}
