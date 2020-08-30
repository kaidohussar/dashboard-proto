import React from 'react';
import { PageHeader, PageInfo } from 'app/components';
import { FrameMain } from 'app/frames/FrameMain';
import { Graph } from 'app/components/Graph';

export namespace App {
  export interface Props {}
}

export const App = (props: App.Props) => {
    return (
        <>
            <PageHeader />
            <FrameMain>
                <PageInfo />
                <Graph />
                {/* graph */}
                {/* additional data */}
            </FrameMain>
        </>
    );
};
