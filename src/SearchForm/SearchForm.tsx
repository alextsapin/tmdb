import { JSX } from 'react';

import { Formik, Form, Field } from 'formik';
import { useSearchParams, useNavigate } from 'react-router-dom';

import css from '@/SearchForm/searchForm.module.less';

type SearchFormProps = {
    onResetMovies?: () => void;
};

export const SearchForm = ({ onResetMovies }: SearchFormProps): JSX.Element => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    return (
        <Formik
            enableReinitialize
            initialValues={{ search: query }}
            onSubmit={(values, { setSubmitting }) => {
                const search = values.search.trim();

                if (!search) {
                    navigate('/search/');
                    setSubmitting(false);
                    onResetMovies?.();

                    return;
                }

                navigate(`/search/?query=${encodeURIComponent(search)}`);
                setSubmitting(false);
            }}
        >
            {({ values, isSubmitting, resetForm }) => {
                const isDisabled = isSubmitting || !values.search.trim();

                return (
                    <Form className={css.form}>
                        <div className={css.inputWrapper}>
                            <Field
                                className={css.input}
                                type="text"
                                name="search"
                                placeholder="Enter movie title..."
                            />

                            {values.search && (
                                <button
                                    type="button"
                                    className={css.clearBtn}
                                    onClick={() => {
                                        resetForm();
                                        navigate('/search/');
                                        onResetMovies?.();
                                    }}
                                >
                                    ×
                                </button>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={css.searchBtn}
                            disabled={isDisabled}
                        >
                            {isSubmitting ? 'Searching...' : 'Search'}
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
};
