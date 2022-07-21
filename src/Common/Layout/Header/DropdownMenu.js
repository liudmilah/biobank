import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Menu, MenuItem } from 'Common';

const menuButtonStyle = {
    color: '#fff',
    margin: '0 10px',
};

export default function DropdownMenu({ title, menuItems, visible }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();

    const open = !!anchorEl;

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const onClickMenuItem = (url) => () => {
        navigate(url);
        handleCloseMenu();
    };

    if (!visible) {
        return null;
    }

    return (
        <>
            <Button
                id="dd-button"
                aria-controls={open ? 'dd-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpenMenu}
                sx={menuButtonStyle}
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
                    <MenuItem key={item.label} onClick={onClickMenuItem(item.url)}>
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
DropdownMenu.propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            url: PropTypes.string,
        })
    ).isRequired,
};
