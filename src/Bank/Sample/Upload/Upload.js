import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { AlertSuccess, AlertError, Button, Typography, Container, req, urls } from 'Common';
import { sampleTypes } from 'Bank';

const containerStyle = { textAlign: 'center' };
const buttonStyle = { margin: '20px 0' };
const fileLabelStyle = { marginLeft: '10px', fontStyle: 'italic' };

function Upload({ type }) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [fileName, setFileName] = useState('');

    function handleFileChanged(e) {
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);

        setFileName(file.name);
        setLoading(true);

        req(urls.UPLOAD_SAMPLES.path, urls.UPLOAD_SAMPLES.method, formData)
            .then(() => {
                setSuccessMessage(t('samplesUploadApiSuccess'));
            })
            .catch((error) => {
                if (!error.status || error.status === 500) {
                    setErrorMessage(t('errorServerError'));
                } else {
                    setErrorMessage(t('samplesUploadApiError'));
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <Container maxWidth="sm" sx={containerStyle}>
            <AlertError visible={!!errorMessage} text={errorMessage} />

            <AlertSuccess visible={!!successMessage} text={successMessage} />

            <Button variant="contained" component="label" disabled={loading} sx={buttonStyle}>
                {t('samplesUploadLabel')}
                <input
                    type="file"
                    hidden
                    onChange={handleFileChanged}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
            </Button>

            <Typography variant="body" color="secondary" sx={fileLabelStyle}>
                {fileName}
            </Typography>
        </Container>
    );
}

Upload.propTypes = {
    type: PropTypes.oneOf(Object.values(sampleTypes)).isRequired,
    visible: PropTypes.bool.isRequired,
};

export default Upload;
