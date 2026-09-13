import { JSX } from 'react';

import { Grid, Skeleton } from '@mui/material';

import { GRID_SIZE_SKELETON } from '@/shared/constants';
import css from '@/Skeleton/movieCardSkeleton.module.less';

export const MovieCardSkeleton = (): JSX.Element => {
    return (
        <Grid size={GRID_SIZE_SKELETON}>
            <div className={css.wrapper}>
                <Skeleton variant="rectangular" width="100%" height="100%" />
            </div>
        </Grid>
    );
};
