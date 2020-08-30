import React, { useEffect } from 'react';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useGraphsActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { ContentLoading } from 'app/ui-components/ContentLoading';
import { GraphMain } from 'app/components/Graph/GraphMain';

export namespace Graph {
    export interface Props {
    }
}

export const Graph = (props: Graph.Props): JSX.Element => {
    const dispatch = useDispatch();
    const graphsActions = useGraphsActions(dispatch);
    const graphsState = useSelector((state: RootState) => state.graphs);

    console.log('isFetchedData', graphsState.isFetching);
    useEffect(() => {
        if (!graphsState.isFetching && !graphsState.endReached) {
            dispatch(graphsActions.fetchAllGraphs())
        }
    }, [graphsState.endReached, dispatch])
    console.log('graphsState', graphsState);
    // Fetch all graphs related to 'alerting-check-policy-conditions'

    return (
        <div className="graphs-wrapper">
            {(graphsState.isFetching || !graphsState.endReached) ? (
                <ContentLoading />
            ) : (
                <GraphMain graphData={graphsState.graphs}/>
            )}
        </div>
    );
};
