import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik, FormikProvider, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from 'Auth';
import { TextInput, AlertError, Button, Container, Paper, Typography, req, urls } from 'Common';
import routes from 'routes';

const contentStyle = {
    padding: '30px',
    textAlign: 'center',
    position: 'relative',
};

const buttonStyle = {
    margin: '50px 0 0 0',
    width: '170px',
};

const linkStyle = {
    position: 'absolute',
    left: 30,
    display: 'block',
    textDecoration: 'none',
    margin: '10px 0',
};

const alertStyle = {
    margin: '10px 0',
};

function Login() {
    const { t } = useTranslation();
    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const schema = yup.object().shape({
        email: yup.string().email(t('errorInvalidEmail')).required(t('errorRequired')),
        password: yup
            .string()
            .min(8, t('errorStrMin', { n: 8 }))
            .max(255, t('errorStrMax', { n: 255 }))
            .required(t('errorRequired')),
    });

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: handleSubmit,
    });

    function handleSubmit(values) {
        setLoading(true);

        const reqData = { email: values.email, password: values.password };

        req(urls.LOGIN.path, urls.LOGIN.method, reqData)
            .then(login)
            .catch(async (error) => {
                setLoading(false);
                if (!error.status || error.status === 500) {
                    setErrorMessage(t('errorServerError'));
                } else {
                    setErrorMessage(t('loginInvalidDataError'));
                }
            });
    }

    return (
        <FormikProvider value={formik}>
            <Form>
                <Container maxWidth="xs">
                    <Paper elevation={0} sx={contentStyle}>
                        <Typography variant="h5">{t('loginTitle')}</Typography>

                        <AlertError visible={!!errorMessage} text={errorMessage} sx={alertStyle} />

                        <TextInput id="email" label={t('loginEmail')} required={true} />

                        <TextInput id="password" label={t('loginPassword')} type="password" required={true} />

                        <Link to={routes.RESET_PASSWORD} style={linkStyle}>
                            {t('loginResetPassword')}
                        </Link>

                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={formik.handleSubmit}
                            sx={buttonStyle}
                            disabled={loading}
                        >
                            {t('loginButton')}
                        </Button>
                    </Paper>
                </Container>
            </Form>
        </FormikProvider>
    );
}

export default Login;
