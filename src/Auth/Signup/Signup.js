import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik, FormikProvider, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { Loading, Container, Paper, Typography, req, urls } from 'Common';
import EmailSentNotification from './EmailSentNotification';
import SignupForm from './SignupForm';

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

function Signup() {
    const { t } = useTranslation();
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [signedUp, setSignedUp] = useState(false);

    const handleSignup = (values) => {
        setLoading(true);

        const reqData = { email: values.email, password: values.password, name: values.name };

        req(urls.SIGNUP.path, urls.SIGNUP.method, reqData)
            .then(() => {
                setLoading(false);
                setSignedUp(true);
            })
            .catch((error) => {
                setLoading(false);
                if (!error.status || error.status === 500) {
                    setErrorMessage(t('errorServerError'));
                } else {
                    setErrorMessage(t('signupInvalidDataError'));
                }
            });
    };

    const schema = yup.object().shape({
        name: yup
            .string()
            .max(100, t('errorStrMax', { n: 100 }))
            .required(t('errorRequired')),
        email: yup.string().email(t('errorInvalidEmail')).required(t('errorRequired')),
        password: yup
            .string()
            .min(8, t('errorStrMin', { n: 8 }))
            .max(255, t('errorStrMax', { n: 255 }))
            .required(t('errorRequired')),
    });

    const formik = useFormik({
        initialValues: { email: '', password: '', name: '' },
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: handleSignup,
    });

    return (
        <FormikProvider value={formik}>
            <Form>
                <Container maxWidth="xs" sx={wrapperStyle}>
                    <Paper elevation={0} sx={contentStyle}>
                        <Typography variant="h5">{t('signupTitle')}</Typography>

                        <Loading visible={loading} />

                        <EmailSentNotification visible={signedUp} email={formik.values.email} />

                        <SignupForm
                            visible={!signedUp}
                            handleSubmit={formik.handleSubmit}
                            errorMessage={errorMessage}
                        />
                    </Paper>
                </Container>
            </Form>
        </FormikProvider>
    );
}

export default Signup;
