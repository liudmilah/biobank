import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Button } from 'Common/index';

const menuButtonStyle = {
    color: '#fff',
    margin: '0 10px',
};

export default function RegularMenuItem({ title, url, visible }) {
    const navigate = useNavigate();

    const onCLick = () => {
        navigate(url);
    };

    if (!visible) {
        return null;
    }

    return (
        <Button sx={menuButtonStyle} onClick={onCLick}>
            {title}
        </Button>
    );
}
RegularMenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
};
