import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { AlertError, ConfirmModal, Loading } from 'Common';

function DeleteSelectedModal({ loading, open, onClose, onConfirm, serverGeneralError }) {
    const { t } = useTranslation();

    return (
        <ConfirmModal
            open={open}
            loading={loading}
            onClose={onClose}
            onConfirm={onConfirm}
            title={''}
            bodyContent={
                <>
                    <Loading visible={loading} />

                    <AlertError
                        visible={!loading && !!serverGeneralError}
                        text={serverGeneralError}
                        sx={{ margin: '20px 0' }}
                    />

                    {t('samplesDeleteSelectedConfirm')}
                </>
            }
        />
    );
}

DeleteSelectedModal.propTypes = {
    loading: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    serverGeneralError: PropTypes.string.isRequired,
};

export default DeleteSelectedModal;
