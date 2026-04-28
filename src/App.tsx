import logo from './images/tmdb.png';
import { Link } from "react-router-dom";
import Container from '@mui/material/Container';

export const  App = () => {
    return (
        <Container>
            <header>
                <Link to="/"><img src={logo} alt="logo"/></Link>
            </header>
        </Container>
    );
}
