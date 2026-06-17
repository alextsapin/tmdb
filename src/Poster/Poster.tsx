import { Formik, Form, Field } from 'formik';
import { Movie } from '../api/api';
import { useAppSelector } from '../store/hooks';
import spinner from '../images/spinner.gif';
import css from './poster.module.less';

type PosterProps = {
    movies: Movie[]
}

export const Poster = (props: PosterProps) => {

    const loading = useAppSelector((state) => state.movies.loading.popular);
    const error = useAppSelector((state) => state.movies.error.popular);
    const moviesWithBackdrop = props.movies.filter((movie) => movie.backdrop_path);
    const randomIndex = Math.floor(Math.random() * moviesWithBackdrop.length);
    const randomMovie = moviesWithBackdrop[randomIndex];

    if (loading) {
        return (
            <div className={css.poster}>
                <img className={css.spinner} src={spinner} alt="spinner" />
            </div>
        )
    }

    if (error) return <div className={css.poster}>{error}</div>

    return (
        <div className={css.poster}
            style={{
                backgroundImage: randomMovie?.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/original${randomMovie.backdrop_path})`
                    : undefined,
            }}
        >
            <h1 className={css.title}>Welcome</h1>

            <Formik
                initialValues={{ search: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('Search:', values.search);
                    // Здесь ваш код для поиска
                    alert('Searching for: ' + values.search);
                    setSubmitting(false);
                }}
            >
                {({ values, isSubmitting, resetForm }) => (
                    <Form className={css.form}>
                        <div className={css.inputWrapper}>
                            <Field
                                className={css.input}
                                type="text"
                                name="search"
                                placeholder="Search for a movie"
                            />
                            {values.search && (
                                <button
                                    className={css.clearBtn}
                                    type="button"
                                    onClick={() => { resetForm() }}
                                    aria-label="Clear search"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                        <button type="submit" className={css.searchBtn} disabled={isSubmitting}>
                            {isSubmitting ? 'Searching...' : 'Search'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
