import React from 'react';
import './index.scss';

export namespace TitleWithIcon {
    export interface Props {
        title: string;
        icon: JSX.Element;
    }
}

export const TitleWithIcon = ({ title, icon }: TitleWithIcon.Props): JSX.Element => {
    return (
        <div className="title-with-icon">
            {icon && (
                <div className="title-with-icon-icon">
                    {icon}
                </div>
            )}
            <h2>{title}</h2>
        </div>
    );
};
