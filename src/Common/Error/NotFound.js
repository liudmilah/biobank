import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const styles = {
    textAlign: 'center',
};

function NotFound() {
    const { t } = useTranslation();

    return (
        <div style={styles}>
            <h1>{t('errorNotFoundTitle')}</h1>
            <p>{t('errorNotFoundText')}</p>
            <p>
                <Link to="/">{t('errorNotFoundLink')}</Link>
            </p>
        </div>
    );
}

export default NotFound;
