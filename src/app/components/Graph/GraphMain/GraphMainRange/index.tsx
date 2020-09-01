import React, { useEffect, useMemo, useState } from 'react';
import './index.scss';
import { IGraphDataMain } from 'app/models';
import {
    Area,
    AreaChart, Line,
    ReferenceLine,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from 'app/reducers';
import dayjs from 'dayjs';

export namespace PageInfo {
    export interface Props {
        graphData: IGraphDataMain;
        updateActiveValue: (value: number) => void;
    }
}

const Cog = (props: any) => {
    return (
        <foreignObject className="config-change-cog" x={props.viewBox.x - 20} y={0}>
            <div className="config-change-cog-wrapper">
                <svg width="24" height="24" fill="rgba(75, 69, 198, .8)" x={1325} y={20} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm512-109v222q0 12-8 23t-20 13l-185 28q-19 54-39 91 35 50 107 138 10 12 10 25t-9 23q-27 37-99 108t-94 71q-12 0-26-9l-138-108q-44 23-91 38-16 136-29 186-7 28-36 28h-222q-14 0-24.5-8.5t-11.5-21.5l-28-184q-49-16-90-37l-141 107q-10 9-25 9-14 0-25-11-126-114-165-168-7-10-7-23 0-12 8-23 15-21 51-66.5t54-70.5q-27-50-41-99l-183-27q-13-2-21-12.5t-8-23.5v-222q0-12 8-23t19-13l186-28q14-46 39-92-40-57-107-138-10-12-10-24 0-10 9-23 26-36 98.5-107.5t94.5-71.5q13 0 26 10l138 107q44-23 91-38 16-136 29-186 7-28 36-28h222q14 0 24.5 8.5t11.5 21.5l28 184q49 16 90 37l142-107q9-9 24-9 13 0 25 10 129 119 165 170 7 8 7 22 0 12-8 23-15 21-51 66.5t-54 70.5q26 50 41 98l183 28q13 2 21 12.5t8 23.5z"/></svg>
            </div>
        </foreignObject>
    );
};

export const GraphMainRange = ({ graphData, updateActiveValue }: PageInfo.Props): JSX.Element | null => {
    const graphsDataFromStore = useSelector((state: RootState) => state.graphs);
    const startDate = graphsDataFromStore.selectedRange?.START;
    const endDate = graphsDataFromStore.selectedRange?.END;

    if (!graphsDataFromStore.graphs || !graphsDataFromStore.selectedGraph || !startDate || !endDate) {
        return null;
    }
    const [referencePoint, setReferencePoint] = useState(undefined);
    const [isDragging, setIsDragging] = useState(false);


    const filteredGraphData = useMemo(() => {
        return graphData.data.filter((data) => ((data.date > startDate) && (data.date < endDate)))
    }, [graphsDataFromStore.selectedRange])

    const configChanges = useMemo(() => {
        return graphData.data.filter((data) => data.type === 'config-change');
    }, [graphsDataFromStore.selectedRange])

    useEffect(() => {
        updateActiveValue(filteredGraphData[filteredGraphData.length - 1].value);
    }, [graphsDataFromStore.selectedGraph, graphsDataFromStore.selectedGraph])

    const onMouseMove = (e: any) => {
        setReferencePoint(e.activeLabel);
        if (isDragging) {
            updateActiveValue(e.activePayload[0].value);
        }
    }

    return (
        <div className="graph-main-range">
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                    data={filteredGraphData}
                    onMouseMove={ (e) => e && e.activeLabel ? onMouseMove(e) : null }
                    onMouseDown={ () => setIsDragging(true) }
                    onMouseUp={() => {
                        setReferencePoint(undefined)
                        setIsDragging(false);
                    }}
                >
                    <XAxis dataKey="date" tickFormatter={(label) => dayjs(label).format('HH:mm')} />
                    <YAxis dataKey="value" />
                    <Line dataKey="Page D" stroke="#8884d8" fill="red"/>
                    {configChanges.map((data, i) => <ReferenceLine key={i} x={data.date} stroke="rgba(75, 69, 198, .3)" label={Cog} />)}
                    {isDragging && <ReferenceLine x={referencePoint} stroke="black"  />}
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="10%" stopColor="rgba(75, 69, 198, 0.1)" stopOpacity={0.8}/>
                            <stop offset="90%" stopColor="#f5f5f5" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="rgba(75, 69, 198, 0.2)" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
