import React, { useRef } from 'react';
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

export namespace PageInfo {
    export interface Props {
        graphdata: IGraphDataMain;
    }
}

const Cog = (props: any) => {
    return (
        <foreignObject className="config-change-cog" x={props.viewBox.x - 20} y={0}>
            <div className="config-change-cog-wrapper">
                <svg width="24" height="24" x={1325} y={20} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm512-109v222q0 12-8 23t-20 13l-185 28q-19 54-39 91 35 50 107 138 10 12 10 25t-9 23q-27 37-99 108t-94 71q-12 0-26-9l-138-108q-44 23-91 38-16 136-29 186-7 28-36 28h-222q-14 0-24.5-8.5t-11.5-21.5l-28-184q-49-16-90-37l-141 107q-10 9-25 9-14 0-25-11-126-114-165-168-7-10-7-23 0-12 8-23 15-21 51-66.5t54-70.5q-27-50-41-99l-183-27q-13-2-21-12.5t-8-23.5v-222q0-12 8-23t19-13l186-28q14-46 39-92-40-57-107-138-10-12-10-24 0-10 9-23 26-36 98.5-107.5t94.5-71.5q13 0 26 10l138 107q44-23 91-38 16-136 29-186 7-28 36-28h222q14 0 24.5 8.5t11.5 21.5l28 184q49 16 90 37l142-107q9-9 24-9 13 0 25 10 129 119 165 170 7 8 7 22 0 12-8 23-15 21-51 66.5t-54 70.5q26 50 41 98l183 28q13 2 21 12.5t8 23.5z"/></svg>
            </div>
        </foreignObject>
    );
};

export const GraphMainRange = (props: PageInfo.Props): JSX.Element => {
    const configLineRef = useRef(null);
    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400,
            "amt": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398,
            "amt": 2210
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800,
            "amt": 2290
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908,
            "amt": 2000
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800,
            "amt": 2181
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800,
            "amt": 2500
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300,
            "amt": 2100
        }
    ]
    console.log('configLineRef', configLineRef.current);
    return (
        <div className="graph-main-range">
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                    data={data}
                    onMouseDown={(e) => console.log('e', e)}
                    onMouseUp={(e) => console.log('mouseup e', e)}
                >
                    <XAxis dataKey="name" />
                    <YAxis dataKey="pv" />
                    <Line dataKey="Page D" stroke="#8884d8" fill="red"/>
                    <ReferenceLine x="Page D" stroke="red" label={Cog} />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
