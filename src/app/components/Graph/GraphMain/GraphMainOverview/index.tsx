import React from 'react';
import './index.scss';
import { IGraphDataMain } from 'app/models';
import { Area, AreaChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export namespace PageInfo {
    export interface Props {
        graphdata: IGraphDataMain;
    }
}

export const GraphMainOverview = (props: PageInfo.Props): JSX.Element => {
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

    return (
        <div className="graph-main-overview">
            <ResponsiveContainer width="99%" minHeight={150}>
                <AreaChart
                    data={data}
                    onMouseDown={(e) => console.log('e', e)}
                    onMouseUp={(e) => console.log('mouseup e', e)}
                >
                    <XAxis dataKey="name" width={0} tick={false} />
                    <YAxis dataKey="pv" width={0} tick={false} />
                    <ReferenceLine x="Page C" stroke="green" label={<div>label item</div>} />
                    <ReferenceLine x="Page D" stroke="green" label={<div>label item</div>} />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
