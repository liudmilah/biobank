import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Button } from 'Common';

function NoContent({ modal, openModal, visible }) {
    if (!visible) {
        return null;
    }

    const { t } = useTranslation();

    return (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
            <p>{t('samplesNotFound')}</p>

            <Button onClick={openModal}>{t('samplesCreate')}</Button>

            {modal}
        </Box>
    );
}

NoContent.propTypes = {
    visible: PropTypes.bool.isRequired,
    modal: PropTypes.node.isRequired,
    openModal: PropTypes.func.isRequired,
};

export default NoContent;
