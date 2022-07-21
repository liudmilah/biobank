import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, IconButton, Menu, MenuIcon, MenuItem } from 'Common';

const boxStyle = { flexGrow: 1, display: { xs: 'flex', md: 'none' } };
const anchorOrigin = { vertical: 'bottom', horizontal: 'left' };
const transformOrigin = { vertical: 'top', horizontal: 'left' };
const linkStyle = { textDecoration: 'none', color: '#555' };
const menuStyle = {
    display: { xs: 'block', md: 'none' },
};

export default function MobileMenu({ menuItems, visible }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    if (!visible) {
        return null;
    }

    return (
        <Box sx={boxStyle}>
            <IconButton size="large" onClick={handleOpenMenu} color="inherit">
                <MenuIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                anchorOrigin={anchorOrigin}
                keepMounted
                transformOrigin={transformOrigin}
                open={!!anchorEl}
                onClose={handleCloseMenu}
                sx={menuStyle}
            >
                {menuItems.map((item) => (
                    <MenuItem key={item.label} onClick={handleCloseMenu}>
                        <Link to={item.url} style={linkStyle}>
                            {item.label}
                        </Link>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}
MobileMenu.propTypes = {
    visible: PropTypes.bool.isRequired,
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            url: PropTypes.string,
        })
    ).isRequired,
};
