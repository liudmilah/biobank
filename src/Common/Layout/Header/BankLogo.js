import * as React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'Common';
import Logo from './Logo';

export default function BankLogo({ styles }) {
    return (
        <Typography variant="h6" noWrap component="div" sx={styles}>
            <Logo />
        </Typography>
    );
}
BankLogo.propTypes = {
    styles: PropTypes.object,
};
