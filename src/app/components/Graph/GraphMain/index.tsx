import React from 'react';
import { GraphMainOverview } from 'app/components/Graph/GraphMain/GraphMainOverview';
import { IGraphs } from 'app/models';
import { GraphMainSelection } from 'app/components/Graph/GraphMain/GraphMainSelection';
import { GraphMainRange } from 'app/components/Graph/GraphMain/GraphMainRange';

export namespace GraphMain {
    export interface Props {
        graphData: IGraphs | null;
    }
}

export const GraphMain = (props: GraphMain.Props): JSX.Element | null => {
    console.log('pro')

    if (!props.graphData) {
        return null;
    }

    return (
        <div className="graph-main">
            <GraphMainSelection />
            <GraphMainOverview graphdata={props.graphData.averageResponseDelayData}/>
            <GraphMainRange graphdata={props.graphData.averageResponseDelayData} />
        </div>
    );
};
