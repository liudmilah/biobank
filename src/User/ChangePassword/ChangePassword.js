import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { useFormik, FormikProvider, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { SubmitModal, TextInput, req, urls } from 'Common';

function ChangePassword({ open, onClose, visible }) {
    const { t } = useTranslation();
    const [errorMessage, setErrorMessage] = useState();

    const handleChangePassword = (values, { setSubmitting }) => {
        setSubmitting(true);

        req(urls.USER_CHANGE_PASSWORD.path, urls.USER_CHANGE_PASSWORD.method, {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
        })
            .then(handleClose)
            .catch((error) => {
                if (!error.status || error.status === 500) {
                    setErrorMessage(t('errorServerError'));
                } else {
                    setErrorMessage(t('userChangePasswordApiError'));
                }
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const schema = yup.object().shape({
        oldPassword: yup
            .string()
            .min(8, t('errorStrMin', { n: 8 }))
            .max(255, t('errorStrMax', { n: 255 }))
            .required(t('errorRequired')),
        newPassword: yup
            .string()
            .min(8, t('errorStrMin', { n: 8 }))
            .max(255, t('errorStrMax', { n: 255 }))
            .required(t('errorRequired')),
    });

    const formik = useFormik({
        initialValues: { oldPassword: '', newPassword: '' },
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: handleChangePassword,
    });

    const { errors, handleSubmit, isSubmitting } = formik;

    function handleClose() {
        onClose();
        formik.setSubmitting(false);
        formik.resetForm();
        setErrorMessage('');
    }

    if (!visible) {
        return null;
    }

    return (
        <SubmitModal
            title={t('userChangePasswordTitle')}
            error={errorMessage}
            loading={isSubmitting}
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            disabledSubmit={isSubmitting || (errors && Object.keys(errors).length > 0)}
            bodyContent={
                <FormikProvider value={formik}>
                    <Form>
                        <TextInput
                            id="oldPassword"
                            label={t('userChangePasswordOldLabel')}
                            type="password"
                            required={true}
                        />
                        <TextInput
                            id="newPassword"
                            label={t('userChangePasswordNewLabel')}
                            type="password"
                            required={true}
                        />
                    </Form>
                </FormikProvider>
            }
        />
    );
}

ChangePassword.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
};

export default ChangePassword;
