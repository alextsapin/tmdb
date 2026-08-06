import { JSX } from 'react';

import { Container } from '@mui/material';

import spinner from '../images/spinner.gif';

import css from './spinner.module.less';

export const Spinner = (): JSX.Element => {
    return (
        <Container id="content">
            <img className={css.spinner} src={spinner} alt="spinner" />
        </Container>
    );
};
