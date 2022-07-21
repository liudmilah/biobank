import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Typography, Container, Grid, LanguageSwitcher } from 'Common';

const barStyle = {
    backgroundColor: 'inherit',
    color: 'inherit',
    boxShadow: 'none',
    padding: '10px',
    textAlign: 'center',
};

function Footer() {
    const { t } = useTranslation();

    const languages = [
        { label: t('langEn'), code: 'en' },
        { label: t('langRu'), code: 'ru' },
        { label: t('langBy'), code: 'by' },
    ];

    return (
        <AppBar position="static" style={barStyle}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography color="inherit" variant="body1">
                            © {t('footerOrganisation')}
                        </Typography>

                        <Typography color="inherit" variant="body1">
                            {t('footerLaboratory')}
                        </Typography>

                        <Typography color="inherit" variant="body1">
                            {new Date().getFullYear()}
                        </Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography color="inherit" variant="body1">
                            {t('footerContacts')}
                        </Typography>

                        <Typography color="inherit" variant="body1">
                            {t('footerAddress')}
                        </Typography>

                        <Typography color="inherit" variant="body1">
                            {t('footerPhone')}
                        </Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <LanguageSwitcher languages={languages} />
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    );
}

export default Footer;
