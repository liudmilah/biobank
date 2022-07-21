import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik, FormikProvider, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { SubmitModal, TextInput, req, urls } from 'Common';
import { changeName, selectUserName } from 'User';

function ChangeName({ open, onClose, visible }) {
    const { t } = useTranslation();
    const [errorMessage, setErrorMessage] = useState();
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);

    const handleChangeName = (values, { setSubmitting }) => {
        setSubmitting(true);

        const name = values.name;

        req(urls.USER_CHANGE_NAME.path, urls.USER_CHANGE_NAME.method, { name })
            .then(() => {
                dispatch(changeName({ name }));
                handleClose();
            })
            .catch((error) => {
                if (!error.status || error.status === 500) {
                    setErrorMessage(t('errorServerError'));
                } else {
                    setErrorMessage(t('userChangeNameApiError'));
                }
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const schema = yup.object().shape({
        name: yup
            .string()
            .max(50, t('errorStrMax', { n: 50 }))
            .required(t('errorRequired')),
    });

    const formik = useFormik({
        initialValues: { name: userName },
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: handleChangeName,
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
            title={t('userChangeNameTitle')}
            error={errorMessage}
            loading={isSubmitting}
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            disabledSubmit={isSubmitting || (errors && Object.keys(errors).length > 0)}
            bodyContent={
                <FormikProvider value={formik}>
                    <Form>
                        <TextInput id="name" label={t('userChangeNameLabel')} required={true} />
                    </Form>
                </FormikProvider>
            }
        />
    );
}

ChangeName.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
};

ChangeName.whyDidYouRender = true;

export default ChangeName;
