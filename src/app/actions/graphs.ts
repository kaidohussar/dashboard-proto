import { useMemo } from 'react';
import { Dispatch } from 'redux';
import { GraphType, IGraphData, IGraphs } from 'app/models';
import { generateMockAverageResponseDelay } from 'app/mock-data-generators';


export namespace GraphsActions {
  export enum Type {
    FETCH_ALL_GRAPHS_REQUEST = 'FETCH_ALL_GRAPHS_REQUEST',
    FETCH_ALL_GRAPHS_SUCCESS = 'FETCH_ALL_GRAPHS_SUCCESS',
    FETCH_ALL_GRAPHS_FAILURE = 'FETCH_ALL_GRAPHS_FAILURE',
  }
  const fetchAllGraphsRequest = () => {
    console.log('request');
    return {
      type: GraphsActions.Type.FETCH_ALL_GRAPHS_REQUEST,
    }
  }

  const fetchAllGraphsSuccess = (graphs: IGraphs) => {
    return {
      type: GraphsActions.Type.FETCH_ALL_GRAPHS_SUCCESS,
      payload: { graphs },
    }
  }

  const fetchAllGraphsFailure = (error: string) => {
    return {
      type: GraphsActions.Type.FETCH_ALL_GRAPHS_FAILURE,
      payload: { error },
    }
  }

  export const fetchAllGraphs = () => {
    return async function(dispatch: Dispatch) {
      console.log('dispatch all request');
      dispatch(fetchAllGraphsRequest())
      const fetchAverageResponseDelayData: Promise<IGraphData[]> = generateMockAverageResponseDelay();
      console.log('fetchAverageResponseDelayData', fetchAverageResponseDelayData);
      Promise.all([
        fetchAverageResponseDelayData,
      ]).then((values) => {
        console.log('values', values);
        dispatch(fetchAllGraphsSuccess({
          averageResponseDelayData: {
            data: values[0],
            isSelected: false,
            type: GraphType.AVG_PAYLOAD_SIZE,
          },
          lastQueueSizeData: {
            data: values[0],
            isSelected: false,
            type: GraphType.LAST_QUEUE_SIZE,
          },
          averagePayloadSize: {
            data: values[0],
            isSelected: false,
            type: GraphType.AVG_PAYLOAD_SIZE,
          },
          deadLetterQueue: {
            data: values[0],
            isSelected: false,
            type: GraphType.AVG_PAYLOAD_SIZE,
          }
        }))
      }).catch((err) => fetchAllGraphsFailure('error'))
    }
  }
}

export type GraphsActions = Omit<typeof GraphsActions, 'Type'>;

export const useGraphsActions = (dispatch: Dispatch) => {
  const { Type, ...actions } = GraphsActions;
  return useMemo(() => actions, [dispatch]) as GraphsActions;
};
