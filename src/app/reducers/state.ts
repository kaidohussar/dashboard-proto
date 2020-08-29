import { GraphsModel } from 'app/models';

export interface RootState {
  graphs: GraphsModel;
  router?: any;
}

export namespace RootState {
  export type GraphsState = RootState['graphs'];
}
