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

export const Graph = ({}: Graph.Props): JSX.Element => {

    const dispatch = useDispatch();
    const graphsActions = useGraphsActions(dispatch);
    const graphsState = useSelector((state: RootState) => state.graphs);

    useEffect(() => {
        if (!graphsState.isFetching && !graphsState.endReached) {
            dispatch(graphsActions.fetchAllGraphs())
        }
    }, [graphsState.endReached, dispatch])
    // Fetch all graphs related to 'alerting-check-policy-conditions'

    return (
        <div className="graphs-wrapper">
            {(graphsState.isFetching || !graphsState.endReached) ? (
                <ContentLoading />
            ) : graphsState.graphs && (
                <GraphMain selectedGraph={graphsState.selectedGraph} graphData={graphsState.graphs}/>
            )}
        </div>
    );
};
