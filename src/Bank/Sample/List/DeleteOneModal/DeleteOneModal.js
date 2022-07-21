import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { AlertError, ConfirmModal, Loading } from 'Common';

function DeleteOneModal({ loading, open, data, onClose, onConfirm, serverGeneralError }) {
    const { t } = useTranslation();

    return (
        <ConfirmModal
            open={open}
            loading={loading}
            onClose={onClose}
            onConfirm={onConfirm}
            title=""
            bodyContent={
                <>
                    <Loading visible={loading} />

                    <AlertError
                        visible={!loading && !!serverGeneralError}
                        text={serverGeneralError}
                        sx={{ margin: '20px 0' }}
                    />

                    {t('samplesDeleteOneConfirm', { name: data.sampleName || '', code: data.sampleCode || '' })}
                </>
            }
        />
    );
}

DeleteOneModal.propTypes = {
    loading: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    data: PropTypes.shape({
        sampleName: PropTypes.string,
        sampleCode: PropTypes.string,
    }).isRequired,
    serverGeneralError: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default DeleteOneModal;
