import React from 'react';
import './page-header.scss';
import { DropdownWithArrow } from 'app/ui-components/DropdownWithArrow';
import { AccountCircle } from '@material-ui/icons';
import { Button } from '@material-ui/core';

export namespace PageHeader {
    export interface Props {
    }
}

export const PageHeader = (props: PageHeader.Props): JSX.Element => {
    return (
        <header>
            <div className="page-header-actions">
                <DropdownWithArrow
                    menuId="header-menu"
                    title="Label #1"
                    menuItems={[
                        {
                            title: 'Label #2',
                            onClick: () => console.log('click label 2'),
                        },
                        {
                            title: 'Label #3',
                            onClick: () => console.log('click label 3'),
                        }
                    ]}
                />
                <Button className="page-header-actions-user">
                    <AccountCircle />
                </Button>
            </div>
        </header>
    );
};
