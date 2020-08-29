import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { ButtonWithIcon } from 'app/ui-components/ButtonWithIcon';

interface IMenuItem {
    title: string;
    onClick: () => void;
}

export namespace DropdownWithArrow {
    export interface Props {
        menuId: string;
        title: string;
        menuItems: IMenuItem[];
    }
}

export const DropdownWithArrow = ({ menuId, title, menuItems }: DropdownWithArrow.Props): JSX.Element => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.BaseSyntheticEvent<MouseEvent, EventTarget & HTMLButtonElement, EventTarget>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event: React.MouseEvent) => { setAnchorEl(null) };
    const handleMenuItemClick = (onClickMethod: IMenuItem['onClick']) => {
        setAnchorEl(null);
        onClickMethod();
    };

    return (
        <>
            <ButtonWithIcon
                title={title}
                icon={(<ExpandMore />)}
                onClick={handleClick}
                hasPopup
                id={menuId}
            />
            {!!menuItems.length && (
                <Menu
                    id={menuId}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {menuItems.map((menuItem, i) => (
                        <MenuItem
                            key={i}
                            onClick={() => handleMenuItemClick(menuItem.onClick)}
                            value={menuItem.title}
                        >
                            {menuItem.title}
                        </MenuItem>
                    ))}
                </Menu>
            )}
        </>
    );
};
