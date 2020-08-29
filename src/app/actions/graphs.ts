import { useMemo } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';

export namespace GraphsActions {
  export enum Type {
    FETCH_ALL_GRAPHS = 'FETCH_ALL_GRAPHS',
  }
  export const fetchAllGraphs = createAction(Type.FETCH_ALL_GRAPHS, () => {
    return {
      status: 'completed',
      graphs: [{ data: 'asd' }],
    }
  })
}

export type GraphsActions = Omit<typeof GraphsActions, 'Type'>;

export const useGraphsActions = (dispatch: Dispatch) => {
  const { Type, ...actions } = GraphsActions;
  return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as GraphsActions;
};
