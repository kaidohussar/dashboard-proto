import { handleActions } from 'redux-actions';
import { GraphsActions } from 'app/actions/graphs';
import { RootState } from './state';
import { GraphsModel } from 'app/models';

const initialState: RootState.GraphsState = {
    error: '',
    isFetching: false,
    endReached: false,
    graphs: null,
    selectedGraph: null,
    selectedRange: null,
};

export const graphsReducer = handleActions<RootState.GraphsState, GraphsModel>(
  {
    [GraphsActions.Type.FETCH_ALL_GRAPHS_REQUEST]: (state, action) => {
      return {
          ...state,
          isFetching: true,
      }
    },
    [GraphsActions.Type.FETCH_ALL_GRAPHS_SUCCESS]: (state, action) => {
      return {
          ...state,
          graphs: action.payload.graphs,
          selectedGraph: action.payload.selectedGraph,
          selectedRange: action.payload.selectedRange,
          isFetching: false,
          endReached: true,
      }
    },
    [GraphsActions.Type.FETCH_ALL_GRAPHS_FAILURE]: (state, action) => {
      return {
          ...state,
          isFetching: false,
          endReached: true,
          error: action.payload.error,
      }
    },
    [GraphsActions.Type.SET_SELECTED_GRAPH_RANGE]: (state, action) => {
      if (!state.selectedGraph || !state.graphs) { return state; }
      return {
        ...state,
        selectedRange: action.payload.selectedRange,
      }
    },
  },
  initialState
);
