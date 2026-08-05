import { JSX } from 'react';

import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';

import css from './searchForm.module.less';

export const SearchForm = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{ search: '' }}
            onSubmit={(values, { setSubmitting }) => {
                const query = values.search.trim();

                if (!query) {
                    setSubmitting(false);

                    return;
                }

                navigate(`/search/?query=${encodeURIComponent(query)}`);
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
                                placeholder="Search for a movie"
                            />

                            {values.search && (
                                <button
                                    type="button"
                                    className={css.clearBtn}
                                    onClick={() => {
                                        resetForm();
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
