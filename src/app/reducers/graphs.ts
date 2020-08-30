import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { GraphsActions } from 'app/actions/graphs';
import { GraphsModel } from 'app/models';

const initialState: RootState.GraphsState = {
    error: '',
    isFetching: false,
    endReached: false,
    graphs: null,
};

export const graphsReducer = handleActions<RootState.GraphsState, GraphsModel>(
  {
    [GraphsActions.Type.FETCH_ALL_GRAPHS_REQUEST]: (state, action) => {
        console.log('request state', state);
      return {
          ...state,
          isFetching: true,
      }
    },
    [GraphsActions.Type.FETCH_ALL_GRAPHS_SUCCESS]: (state, action) => {
        console.log('reducer actions', action);
      return {
          ...state,
          graphs: action.payload.graphs,
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
  },
  initialState
);
