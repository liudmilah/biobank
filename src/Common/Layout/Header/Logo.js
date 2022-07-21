import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, IconButton, Icon } from 'Common';

const buttonStyle = { width: '150px' };
const titleStyle = { flexGrow: 1 };
const linkStyle = {
    marginLeft: '6px',
    textDecoration: 'none',
    color: 'white',
};

function Logo() {
    return (
        <>
            <IconButton edge="start" style={buttonStyle} color="inherit">
                <Icon>
                    <img src={'/images/logo.svg'} height={25} alt="logo" />
                </Icon>

                <Link to="/" style={linkStyle}>
                    BioBank
                </Link>
            </IconButton>
            <Typography variant="h6" style={titleStyle} />
        </>
    );
}

Logo.propTypes = {};

export default Logo;
