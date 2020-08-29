import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useGraphsActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { PageHeader, PageInfo } from 'app/components';
import { FrameMain } from 'app/frames/FrameMain';
import { Graph } from 'app/components/Graph';

export namespace App {
  export interface Props extends RouteComponentProps<void> {}
}

export const App = (props: App.Props) => {
    const dispatch = useDispatch();
    const graphsActions = useGraphsActions(dispatch);
    const status = useSelector((state: RootState) => state.graphs.status);

    console.log('status', status);
    useEffect(() => {
        if (status === 'pending') {
            dispatch(graphsActions.fetchAllGraphs())
        }
    }, [status, dispatch])

    // Fetch all graphs related to 'alerting-check-policy-conditions'

    return (
        <>
            <PageHeader />
            <FrameMain>
                <PageInfo />
                <Graph>

                </Graph>
                {/* graph */}
                {/* additional data */}
            </FrameMain>
        </>
    );
};
