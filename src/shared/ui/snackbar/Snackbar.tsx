import { JSX } from 'react';

import { Alert, Snackbar as SnackbarMUI } from '@mui/material';

import { SNACKBAR_AUTO_HIDE_MS } from './constants';

type SnackbarProps = {
    error: string | null;
    onClose: () => void;
};

export const Snackbar = ({ error, onClose }: SnackbarProps): JSX.Element => {
    return (
        <SnackbarMUI
            open={Boolean(error)}
            autoHideDuration={SNACKBAR_AUTO_HIDE_MS}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Alert
                severity="error"
                variant="filled"
                onClose={onClose}
                sx={{ width: '100%' }}
            >
                {error}
            </Alert>
        </SnackbarMUI>
    );
};
