import React, { useMemo } from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'app/reducers';
import { IGraphs } from 'app/models';
import { IMinGraphInfo, MinGraphInfo } from 'app/ui-components/MinGraphInfo';
import { AccessTime, FormatSize, PanoramaHorizontal, Note } from '@material-ui/icons';

export namespace GraphMainSelection {
    export interface Props {
        activeValue: string;
    }
}

export const GraphMainSelection = ({ activeValue }: GraphMainSelection.Props) => {
    const graphsState = useSelector((state: RootState) => state.graphs);

    if (!graphsState.graphs) {
        return null;
    }

    const getItemData = (item: keyof IGraphs): IMinGraphInfo | undefined => {
        if (!graphsState.graphs) { return; }
        switch (item) {
            case 'averageResponseDelayData':
                return {
                    title: 'Avg. response delay',
                    value: graphsState.graphs.averageResponseDelayData.data[0].value.toString(),
                    unit: graphsState.graphs.averageResponseDelayData.data[0].unit,
                    isSelected: false,
                    icon: <AccessTime />,
                };
            case 'lastQueueSizeData':
                return {
                    title: 'Last queue size',
                    value: graphsState.graphs.averageResponseDelayData.data[0].value.toString(),
                    unit: undefined,
                    isSelected: true,
                    icon: <FormatSize />,
                }
            case 'averagePayloadSize':
                return {
                    title: 'Avg. payload size',
                    value: graphsState.graphs.averagePayloadSize.data[0].value.toString(),
                    unit: graphsState.graphs.averageResponseDelayData.data[0].unit,
                    isSelected: false,
                    icon: <PanoramaHorizontal />,
                };
            case 'deadLetterQueue':
                return {
                    title: 'Dead letter queue',
                    value: graphsState.graphs.deadLetterQueue.data[0].value.toString(),
                    unit: graphsState.graphs.deadLetterQueue.data[0].unit,
                    isSelected: false,
                    icon: <Note />,
                };
            default:
                return;
        }
    }
    
    const currentGraphs = Object.keys(graphsState.graphs) as (keyof IGraphs)[] ;
    
    return (
        <div className="graph-main-selection">
            {currentGraphs.map((graphItem, i) => {
                const data = useMemo(() => getItemData(graphItem), [currentGraphs]);

                return data && (
                    <MinGraphInfo key={i} {...data} activeValue={data.isSelected ? activeValue : ''} />
                )
            })}
        </div>
    );
};
