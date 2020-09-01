import React, { useState } from 'react';
import { GraphMainOverview } from 'app/components/Graph/GraphMain/GraphMainOverview';
import { GraphMainSelection } from 'app/components/Graph/GraphMain/GraphMainSelection';
import { GraphMainRange } from 'app/components/Graph/GraphMain/GraphMainRange';
import { IGraphs } from 'app/models';

export namespace GraphMain {
    export interface Props {
        graphData: IGraphs | null;
        selectedGraph: keyof IGraphs | null;
    }
}

export const GraphMain = ({ graphData, selectedGraph }: GraphMain.Props): JSX.Element | null => {
    const [activeValue, setActiveValue] = useState('');

    if (!graphData || !selectedGraph) {
        return null;
    }

    return (
        <div className="graph-main">
            <GraphMainSelection activeValue={activeValue} />
            <GraphMainOverview graphData={graphData[selectedGraph]}/>
            <GraphMainRange
                updateActiveValue={(activeValue) => setActiveValue(activeValue ? activeValue.toString() : '')}
                graphData={graphData[selectedGraph]}
            />
        </div>
    );
};
