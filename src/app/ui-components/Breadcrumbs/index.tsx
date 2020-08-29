import React from 'react';
import './index.scss';
import { ArrowForward } from '@material-ui/icons';

interface BreadcrumbItem {
    title: string;
    onClick?: () => void;
}

export namespace Breadcrumbs {
    export interface Props {
        breadcrumbItems: BreadcrumbItem[];
    }
}

export const Breadcrumbs = ({ breadcrumbItems }: Breadcrumbs.Props): JSX.Element | null => {

    if (!breadcrumbItems.length) { return null; }

    return (
        <div className="breadcrumbs-wrapper">
            {breadcrumbItems.map((breadcrumbItem, i) => (
                <button key={i} onClick={breadcrumbItem.onClick} className="breadcrumbs-item">
                    {breadcrumbItem.title}
                    {i !== (breadcrumbItems.length - 1) && (
                        <ArrowForward />
                    )}
                </button>
            ))}
        </div>
    )
};
