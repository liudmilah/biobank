import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import routes from 'routes';

function SignupConfirmSuccess({ visible }) {
    const { t } = useTranslation();

    if (!visible) {
        return null;
    }

    return (
        <p>
            {t('signupTokenConfirmed')}
            <Link to={routes.LOGIN}>{t('signupGoToLogin')}</Link>
        </p>
    );
}

SignupConfirmSuccess.propTypes = {
    visible: PropTypes.bool.isRequired,
};

export default SignupConfirmSuccess;
