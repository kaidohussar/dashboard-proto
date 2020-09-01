import React, { useState } from 'react';
import './index.scss';
import { IGraphDataMain, SelectedRangeSides } from 'app/models';
import { Area, AreaChart, ReferenceArea, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/reducers';
import { GraphsActions } from 'app/actions';

export namespace PageInfo {
    export interface Props {
        graphData: IGraphDataMain;
    }
}

export const GraphMainOverview = ({ graphData }: PageInfo.Props): JSX.Element | null => {
    const graphsData = useSelector((state: RootState) => state.graphs);
    if (!graphsData.graphs || !graphsData.selectedGraph || !graphsData.selectedRange) {
        return null;
    }
    const dispatch = useDispatch();

    const rangeStart = graphsData.selectedRange.START;
    const rangeEnd = graphsData.selectedRange.END;

    const [selectedArea, setSelectedArea] = useState({
        [SelectedRangeSides.START]: rangeStart,
        [SelectedRangeSides.END]: rangeEnd,
    })

    const [selectedAreaSide, setSelectedAreaSide] = useState<SelectedRangeSides | null>(null);

    const findClosestAreaSide = (activeLabel: number) => {
        if (!selectedArea) { return; }
        const lengthToRangeStart = Math.abs(selectedArea[SelectedRangeSides.START] - activeLabel);
        const lengthToRangeEnd = Math.abs(selectedArea[SelectedRangeSides.END] - activeLabel);
        const isStartClosest = lengthToRangeStart < lengthToRangeEnd;
        setSelectedAreaSide(isStartClosest ? SelectedRangeSides.START : SelectedRangeSides.END);
    }
    return (
        <div className="graph-main-overview">
            <ResponsiveContainer width="99%" minHeight={150}>
                <AreaChart
                    data={graphData.data}
                    onMouseDown={ (e) => findClosestAreaSide(e.activeLabel) }
                    onMouseMove={(e) => {
                        if (selectedAreaSide) {
                            setSelectedArea({
                                ...selectedArea,
                                [selectedAreaSide]: e.activeLabel
                            })
                        }
                    }}
                    onMouseUp = { () => {
                        if (!graphsData.selectedGraph) { return; }
                        setSelectedAreaSide(null);
                        dispatch({
                            type: GraphsActions.Type.SET_SELECTED_GRAPH_RANGE,
                            payload: { selectedGraph: graphsData.selectedGraph, selectedRange: {
                                [SelectedRangeSides.START]: selectedArea[SelectedRangeSides.START],
                                [SelectedRangeSides.END]: selectedArea[SelectedRangeSides.END]
                            }},
                        })
                    }}
                >
                    <XAxis dataKey="date" width={0} tick={false} />
                    <YAxis dataKey="value" width={0} tick={false} />
                    <ReferenceArea x1={selectedArea[SelectedRangeSides.START]} x2={selectedArea[SelectedRangeSides.END]} fill="rgba(75, 69, 198, 0.3)" />
                    <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="10%" stopColor="rgba(186, 186, 186, 0.1)" stopOpacity={0.8}/>
                            <stop offset="90%" stopColor="#f5f5f5" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="rgba(186, 186, 186, 0.7)" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
