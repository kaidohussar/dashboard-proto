import { combineReducers } from 'redux';
import { RootState } from './state';
import { graphsReducer } from './graphs';

export { RootState };

export const rootReducer = combineReducers<RootState>({
  graphs: graphsReducer
});
