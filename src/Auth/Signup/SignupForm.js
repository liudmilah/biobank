import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { AlertError, Button, TextInput } from 'Common';

const alertStyle = {
    margin: '10px 0',
};

const buttonStyle = {
    margin: '25px 0 0 0',
    width: '170px',
};

function SignupForm({ visible, handleSubmit, errorMessage }) {
    if (!visible) {
        return null;
    }

    const { t } = useTranslation();

    return (
        <>
            <AlertError visible={!!errorMessage} text={errorMessage} sx={alertStyle} />

            <TextInput id="name" label={t('signupName')} required={true} />

            <TextInput id="email" label={t('signupEmail')} required={true} />

            <TextInput id="password" label={t('signupPassword')} type="password" required={true} />

            <Button variant="contained" color="secondary" onClick={handleSubmit} sx={buttonStyle}>
                {t('signupButton')}
            </Button>
        </>
    );
}

SignupForm.propTypes = {
    visible: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
};

export default SignupForm;
