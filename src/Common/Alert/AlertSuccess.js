import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@mui/material';

function AlertSuccess({ visible, text = '', sx = {} }) {
    if (!visible) {
        return null;
    }

    return (
        <Alert severity="success" sx={sx}>
            {text}
        </Alert>
    );
}

AlertSuccess.propTypes = {
    visible: PropTypes.bool.isRequired,
    text: PropTypes.string,
    sx: PropTypes.object,
};

export default AlertSuccess;
