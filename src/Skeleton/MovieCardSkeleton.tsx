import { JSX } from 'react';

import { Grid, Skeleton } from '@mui/material';

import css from './MovieCardSkeleton.module.less';

export const MovieCardSkeleton = (): JSX.Element => {
    return (
        <Grid size={2}>
            <div className={css.wrapper}>
                <Skeleton variant="rectangular" width="100%" height="100%" />
            </div>
        </Grid>
    );
};
