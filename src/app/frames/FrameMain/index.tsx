import React, { PropsWithChildren } from 'react';
import './index.scss';

export namespace FrameMain {
    export interface Props extends PropsWithChildren<any>{
    }
}

export const FrameMain = (props: FrameMain.Props): JSX.Element => {
    return (
        <div className="frame-main">
            {props.children}
        </div>
    );
};
