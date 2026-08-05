import { ReactElement } from 'react';

import { Route, Routes } from 'react-router-dom';

import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Category } from './pages/Category';
import { FavoritesPage } from './pages/Favorites';
import { FilteredMoviesPage } from './pages/Filtered';
import { Home } from './pages/Home';
import { MoviePage } from './pages/Movie/Movie';
import { NotFoundPage } from './pages/NotFound';
import { SearchPage } from './pages/Search';

import './less/App.less';

export const App = (): ReactElement => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MoviePage />} />
                <Route path="/category-movies/" element={<Category />} />
                <Route path="/filtered-movies/" element={<FilteredMoviesPage />} />
                <Route path="/search/" element={<SearchPage />} />
                <Route path="/favorites/" element={<FavoritesPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </>
    );
};
