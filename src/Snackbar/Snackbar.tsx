import { JSX } from 'react';

import { Alert, Snackbar } from '@mui/material';

import { SNACKBAR_AUTO_HIDE_MS } from '@/shared/constants';

type SnackbarProps = {
    error: string | null;
    onClose: () => void;
};

export const ErrorSnackbar = ({ error, onClose }: SnackbarProps): JSX.Element => {
    return (
        <Snackbar
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
        </Snackbar>
    );
};
