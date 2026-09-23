import { JSX } from 'react';

import { Container } from '@mui/material';

export const Error404 = (): JSX.Element => {
    return (
        <Container id="content">
            <h1>Error 404 — Page not found</h1>
            <p>The page you are looking for does not exist.</p>
        </Container>
    );
};
