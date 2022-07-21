import * as React from 'react';
import PropTypes from 'prop-types';
import { Avatar, IconButton, Menu, MenuItem, Typography, ListItemIcon } from 'Common';

const profileMenuStyle = { mt: '45px' };
const profileAnchorOrigin = { vertical: 'top', horizontal: 'right' };
const profileTransformOrigin = { vertical: 'top', horizontal: 'right' };

function getInitials(name) {
    const initials = [...name.matchAll(/(\p{L}{1})\p{L}+/gu)] || []; // todo names contains only numbers

    const first = initials.shift();
    const last = initials.pop();
    return ((first ? first[1] : '') + (last ? last[1] : '')).toUpperCase();
}

export default function AvatarMenu({ menuItems, userName, visible }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const onClickItem = (func) => () => {
        func();
        handleCloseMenu();
    };

    if (!visible) {
        return null;
    }

    return (
        <>
            <IconButton onClick={handleOpenMenu}>
                <Avatar>{getInitials(userName)}</Avatar>
            </IconButton>
            <Menu
                sx={profileMenuStyle}
                anchorEl={anchorEl}
                anchorOrigin={profileAnchorOrigin}
                keepMounted
                transformOrigin={profileTransformOrigin}
                open={!!anchorEl}
                onClose={handleCloseMenu}
            >
                {menuItems.map(
                    (item) =>
                        item.component || (
                            <MenuItem key={item.label} onClick={onClickItem(item.onClick)}>
                                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                                <Typography textAlign="center">{item.label}</Typography>
                            </MenuItem>
                        )
                )}
            </Menu>
        </>
    );
}
AvatarMenu.propTypes = {
    userName: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            onClick: PropTypes.func,
            component: PropTypes.node,
        })
    ).isRequired,
};
