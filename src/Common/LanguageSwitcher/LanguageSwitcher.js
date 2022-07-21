import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link, Typography } from 'Common';

function LanguageSwitcher({ languages }) {
    const { i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div>
            {languages.map((lang) => (
                <Typography key={lang.code} color="inherit" variant="body1" sx={{ cursor: 'pointer' }}>
                    <Link color="inherit" onClick={() => changeLanguage(lang.code)}>
                        {lang.label}
                    </Link>
                </Typography>
            ))}
        </div>
    );
}

LanguageSwitcher.propTypes = {
    languages: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.string,
            label: PropTypes.string,
        })
    ),
};

export default LanguageSwitcher;
