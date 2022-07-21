import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@mui/material';

function AlertError({ visible, text = '', sx = {} }) {
    if (!visible) {
        return null;
    }

    return (
        <Alert severity="error" sx={sx}>
            {text}
        </Alert>
    );
}

AlertError.propTypes = {
    visible: PropTypes.bool.isRequired,
    text: PropTypes.string,
    sx: PropTypes.object,
};

export default AlertError;
