import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

import './less/App.less';
import { HomePage } from './pages/Home';
import { Route, Routes } from 'react-router-dom';
//import { CategoryMoviesPage } from './pages/CategoryMovies';
import { FilteredMoviesPage } from './pages/FilteredMovies';
import { SearchPage } from './pages/Search';
import { FavoritesPage } from './pages/Favorites';
import { NotFoundPage } from './pages/NotFound';

export const App = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/* <Route path="/category-movies/" element={<CategoryMoviesPage />} /> */}
                <Route path="/filtered-movies/" element={<FilteredMoviesPage />} />
                <Route path="/search/" element={<SearchPage />} />
                <Route path="/favorites/" element={<FavoritesPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer/>
        </>
    );
};
