import React, { BaseSyntheticEvent } from 'react';
import { Button } from '@material-ui/core';

export namespace ButtonWithIcon {
    export interface Props {
        title: string;
        icon: React.ReactElement;
        onClick: (event: BaseSyntheticEvent<MouseEvent, EventTarget & HTMLButtonElement, EventTarget>) => void;
        id?: string;
        hasPopup?: boolean;
        className?: string;
    }
}

export const ButtonWithIcon = ({ title, icon, id, hasPopup, onClick, className }: ButtonWithIcon.Props): JSX.Element => {
    return (
        <Button className={className} aria-controls={id} aria-haspopup={!!hasPopup} onClick={onClick}>
            {title}
            {icon}
        </Button>
    );
};
