import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { GraphsActions } from 'app/actions/graphs';
import { GraphsModel } from 'app/models';

const initialState: RootState.GraphsState = {
    status: 'pending',
    graphs: [],
};

export const graphsReducer = handleActions<RootState.GraphsState, GraphsModel>(
  {
    [GraphsActions.Type.FETCH_ALL_GRAPHS]: (state, action) => {
      return state;
    },
  },
  initialState
);
