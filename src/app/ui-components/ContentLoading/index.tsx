import React from 'react';
import './index.scss';
import { CircularProgress } from '@material-ui/core';

export namespace ContentLoading {
    export interface Props {
    }
}

export const ContentLoading = (): JSX.Element => {
    return (
        <div className="content-loading">
            <CircularProgress />
        </div>
    );
};
