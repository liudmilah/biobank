import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Container, Loading, Paper, Typography, req, urls } from 'Common';
import SignupConfirmError from './SignupConfirmError';
import SignupConfirmSuccess from './SignupConfirmSuccess';

const wrapperStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '100%',
};

const contentStyle = {
    padding: '30px',
    textAlign: 'center',
    position: 'relative',
};

function SignupConfirm() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');

    useEffect(() => {
        req(urls.SIGNUP_CONFIRM.path, urls.SIGNUP_CONFIRM.method, { token })
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setFailed(true);
                setLoading(false);
            });
    }, []);

    return (
        <Container maxWidth="xs" sx={wrapperStyle}>
            <Paper elevation={0} sx={contentStyle}>
                <Typography variant="h5">{t('signupConfirmTitle')}</Typography>

                <Loading visible={loading} />

                <SignupConfirmError visible={!loading && failed} />

                <SignupConfirmSuccess visible={!loading && !failed} />
            </Paper>
        </Container>
    );
}

export default SignupConfirm;
