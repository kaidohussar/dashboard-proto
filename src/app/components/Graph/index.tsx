import React, { PropsWithChildren } from 'react';
import './index.scss';

export namespace Graph {
    export interface Props extends PropsWithChildren<any>{
    }
}

export const Graph = (props: Graph.Props): JSX.Element => {
    return (
        <div className="graph-main">
            {props.children}
        </div>
    );
};
