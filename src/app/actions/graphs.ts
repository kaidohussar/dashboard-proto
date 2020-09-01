import { useMemo } from 'react';
import { Dispatch } from 'redux';
import {
  GraphType,
  IGraphData,
  IGraphs,
  SelectedRangeSides,
} from 'app/models';
import { generateMockAverageResponseDelay } from 'app/mock-data-generators';
import dayjs from 'dayjs';


export namespace GraphsActions {
  export enum Type {
    FETCH_ALL_GRAPHS_REQUEST = 'FETCH_ALL_GRAPHS_REQUEST',
    FETCH_ALL_GRAPHS_SUCCESS = 'FETCH_ALL_GRAPHS_SUCCESS',
    FETCH_ALL_GRAPHS_FAILURE = 'FETCH_ALL_GRAPHS_FAILURE',

    SET_SELECTED_GRAPH_RANGE = 'SET_SELECTED_GRAPH_RANGE',
  }
  const fetchAllGraphsRequest = () => {
    return {
      type: GraphsActions.Type.FETCH_ALL_GRAPHS_REQUEST,
    }
  }

  const fetchAllGraphsSuccess = (graphs: IGraphs, selectedGraph: keyof IGraphs, selectedRange: {[key in SelectedRangeSides]: number}) => {
    return {
      type: GraphsActions.Type.FETCH_ALL_GRAPHS_SUCCESS,
      payload: { graphs, selectedGraph, selectedRange },
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
      dispatch(fetchAllGraphsRequest())
      const fetchAverageResponseDelayData: Promise<IGraphData[]> = generateMockAverageResponseDelay();
      fetchAverageResponseDelayData.then((values) => {
        const rangeStart = dayjs().startOf('day').subtract(1, 'day').valueOf();
        const rangeEnd = values[values.length -1].date;
        // data only on 'lastQueueSizeData' (proto)
        dispatch(fetchAllGraphsSuccess({
          averageResponseDelayData: {
            data: [{
              date: 0,
              type: 'default',
              label: '',
              value: 23,
              unit: 'ms',
            }],
            type: GraphType.AVG_PAYLOAD_SIZE,
          },
          lastQueueSizeData: {
            data: values,
            type: GraphType.LAST_QUEUE_SIZE,
          },
          averagePayloadSize: {
            data: [{
              date: 0,
              type: 'default',
              label: '',
              value: 1.35,
              unit: 'kb',
            }],
            type: GraphType.AVG_PAYLOAD_SIZE,
          },
          deadLetterQueue: {
            data: [{
              date: 0,
              type: 'default',
              label: '',
              value: 0,
            }],
            type: GraphType.AVG_PAYLOAD_SIZE,
          }
        },
            'lastQueueSizeData', // in reality maybe here determine based on received data on what graph to select
        {
          [SelectedRangeSides.START]: rangeStart,
          [SelectedRangeSides.END]: rangeEnd,
        }
        ))
      }).catch(() => fetchAllGraphsFailure('error'))
    }
  }
}

export type GraphsActions = Omit<typeof GraphsActions, 'Type'>;

export const useGraphsActions = (dispatch: Dispatch) => {
  const { Type, ...actions } = GraphsActions;
  return useMemo(() => actions, [dispatch]) as GraphsActions;
};
