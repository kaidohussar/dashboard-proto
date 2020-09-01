import React from 'react';
import './index.scss';
import {
    LineChart, Line, ResponsiveContainer,
} from 'recharts';

export interface IMinGraphInfo {
    title: string;
    value: string;
    unit?: 'ms' | 'kb' | string;
    isSelected: boolean;
    icon: React.ReactElement;
}

export namespace MinGraphInfo {
    export interface Props extends IMinGraphInfo {
        activeValue: string;
    }
}

export const MinGraphInfo = ({title, value, unit, isSelected, icon, activeValue}: MinGraphInfo.Props): JSX.Element | null => {
    const data = [
        {
            pv: 1252
        },
        {
            pv: 4672
        },
        {
            pv: 2233
        },
        {
            pv: 3578
        },
        {
            pv: 4201
        },
        {
            pv: 2231
        },
        {
            pv: 5620
        },
    ];

    return (
        <div className={`min-graph-info ${isSelected ? 'selected' : ''}`}>
            <div className="min-graph-info-header">
                <div className="min-graph-info-header-title">{title}</div>
                <div className="min-graph-info-header-icon">{icon}</div>
            </div>
            <div className="min-graph-info-value">{`${isSelected ? activeValue : value}${unit ? unit : ''}`}</div>
            {!isSelected && (
                <ResponsiveContainer width="100%" height={70}>
                    <LineChart data={data}>
                        <Line type="monotone" dot={false} dataKey="pv" stroke="#8884d8" strokeWidth={1} />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    )
};
