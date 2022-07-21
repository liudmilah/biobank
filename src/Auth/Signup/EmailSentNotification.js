import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

function EmailSentNotification({ visible, email }) {
    const { t } = useTranslation();

    if (!visible) {
        return null;
    }

    return <p>{t('signupSentEmail', { email })}</p>;
}

EmailSentNotification.propTypes = {
    visible: PropTypes.bool,
    email: PropTypes.string.isRequired,
};

export default EmailSentNotification;
