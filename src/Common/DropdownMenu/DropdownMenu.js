import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, MenuItem } from 'Common';

export default function DropdownMenu({ title, menuItems, btnStyle = {}, btnProps = {} }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = !!anchorEl;

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleClick = (item) => () => {
        item.onClick();
        handleCloseMenu();
    };

    return (
        <>
            <Button
                id="dd-button"
                aria-controls={open ? 'dd-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpenMenu}
                sx={btnStyle}
                {...btnProps}
            >
                {title}
            </Button>
            <Menu
                id="dd-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'dd-button',
                }}
            >
                {menuItems.map((item) => (
                    <MenuItem key={item.label} onClick={handleClick(item)}>
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
DropdownMenu.propTypes = {
    title: PropTypes.string.isRequired,
    btnStyle: PropTypes.object,
    btnProps: PropTypes.object,
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
        })
    ).isRequired,
};
