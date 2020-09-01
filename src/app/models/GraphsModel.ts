/** Graphs item model definitions **/

export enum GraphType {
  AVG_RESPONSE_DELAY = 'AVG_RESPONSE_DELAY',
  LAST_QUEUE_SIZE = 'LAST_QUEUE_SIZE',
  AVG_PAYLOAD_SIZE = 'AVG_PAYLOAD_SIZE',
  DEAD_LETTER_QUEUE = 'DEAD_LETTER_QUEUE',
}

export interface IGraphDataMain {
  type: GraphType,
  data: IGraphData[];
}

export type GraphDataItemType = 'default' | 'config-change';
export type GraphDataItemUnit = 'ms' | 'kb';

export enum SelectedRangeSides {
  START = 'START',
  END = 'END',
}

export interface IGraphData {
  date: number;
  type: GraphDataItemType,
  label: string;
  value: number;
  unit?: GraphDataItemUnit;
}

export interface IGraphs {
  averageResponseDelayData: IGraphDataMain;
  lastQueueSizeData: IGraphDataMain;
  averagePayloadSize: IGraphDataMain;
  deadLetterQueue: IGraphDataMain;
}

export interface GraphsModel {
  isFetching: boolean;
  endReached: boolean;
  error: '';
  selectedGraph: keyof IGraphs | null;
  selectedRange: { [key in SelectedRangeSides]: number } | null
  graphs: IGraphs | null;
}
