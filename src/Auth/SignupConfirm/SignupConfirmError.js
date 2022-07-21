import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import routes from 'routes';

function SignupConfirmError({ visible }) {
    const { t } = useTranslation();

    if (!visible) {
        return null;
    }

    return (
        <p>
            {t('signupInvalidToken')}
            <Link to={routes.SIGNUP}>{t('signupGoToSignup')}</Link>
        </p>
    );
}

SignupConfirmError.propTypes = {
    visible: PropTypes.bool.isRequired,
};

export default SignupConfirmError;
