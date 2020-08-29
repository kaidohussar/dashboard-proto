import React from 'react';
import './index.scss';
import { Breadcrumbs } from 'app/ui-components/Breadcrumbs';
import { ButtonWithIcon } from 'app/ui-components/ButtonWithIcon';
import { AccountTree, Launch, Settings } from '@material-ui/icons';
import { TitleWithIcon } from 'app/ui-components/TitleWithIcon';

export namespace PageInfo {
  export interface Props {
  }
}

export const PageInfo = (props: PageInfo.Props): JSX.Element => {
    return (
        <div className="page-info">
            <div className="page-info-upper">
                <Breadcrumbs
                    breadcrumbItems={[
                        { title: 'Breadcrumbs root' },
                        { title: 'Breadcrumbs item #2' },
                        { title: 'Breadcrumbs item #1' },
                    ]}
                />
                <div className="page-info-upper-items">
                    <ButtonWithIcon
                        className="page-info-upper-items-item"
                        title="AWS Console"
                        icon={<Launch />}
                        onClick={() => console.log('click')}
                    />
                    <ButtonWithIcon
                        className="page-info-upper-items-item"
                        title="Configuration"
                        icon={<Settings />}
                        onClick={() => console.log('click')}
                    />
                </div>
            </div>
            <div className="page-info-lower">
                <TitleWithIcon
                    title="alerting-check-policy-conditions"
                    icon={(<AccountTree />)}
                />
            </div>
        </div>
    );
};
