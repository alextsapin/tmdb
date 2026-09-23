import { JSX } from 'react';

import { Grid, Skeleton as MuiSkeleton } from '@mui/material';

import { GRID_SIZE_SKELETON } from '../../model/constants';

import css from './skeleton.module.less';

export const Skeleton = (): JSX.Element => {
    return (
        <Grid size={GRID_SIZE_SKELETON}>
            <div className={css.wrapper}>
                <MuiSkeleton variant="rectangular" width="100%" height="100%" />
            </div>
        </Grid>
    );
};
