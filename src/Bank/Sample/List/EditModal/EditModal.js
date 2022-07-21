import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { useFormik, FormikProvider } from 'formik';
import { useTranslation } from 'react-i18next';
import { SelectInput, SubmitModal, TextInput } from 'Common';
import sampleTypes from '../../../sampleTypes';
import useSamplesLabels from '../../useSamplesLabels';
import { SampleMap } from '../SampleMap';

const SampleSelectInput = ({ col, species }) => {
    return (
        <SelectInput
            key={col.id}
            options={species.map((s) => ({ value: s.nameLat, label: s.nameLat }))}
            id={col.id}
            label={col.label}
            required={col.required}
            disabled={col.disabled}
        />
    );
};
SampleSelectInput.propTypes = {
    col: PropTypes.object.isRequired,
    species: PropTypes.array.isRequired,
};

const SampleTextInput = ({ col }) => {
    return <TextInput key={col.id} id={col.id} label={col.label} required={col.required} disabled={col.disabled} />;
};
SampleTextInput.propTypes = {
    col: PropTypes.object.isRequired,
};

function EditModal({ open, loading, serverGeneralError, serverValidationErrors, onSave, onClose, data, isNewSample }) {
    const { t } = useTranslation();
    const labels = useSamplesLabels();
    const species = data.species && data.species.length > 0 ? data.species : [];

    const columns = [
        {
            id: 'code',
            label: labels.code,
            required: true,
            disabled: !isNewSample,
            validation: yup
                .string()
                .max(100, t('errorStrMax', { n: 100 }))
                .required(t('errorRequired')),
        },
        {
            id: 'nameLat',
            label: labels.nameLat,
            required: true,
            disabled: !isNewSample,
            isSelectInput: true,
            validation: yup.string().required(t('errorRequired')),
        },
        {
            id: 'interiorCode',
            label: labels.interiorCode,
            visible: data.type === sampleTypes.BIRD,
            validation: yup.string().max(100, t('errorStrMax', { n: 100 })),
        },
        {
            id: 'date',
            label: labels.date,
            validation: yup.string().max(50, t('errorStrMax', { n: 50 })),
        },
        {
            id: 'place',
            label: labels.place,
            validation: yup.string().max(255, t('errorStrMax', { n: 255 })),
        },
        {
            id: 'material',
            label: labels.material,
            validation: yup.string().max(255, t('errorStrMax', { n: 255 })),
        },
        {
            id: 'sex',
            label: labels.sex,
            validation: yup.string().max(20, t('errorStrMax', { n: 20 })),
        },
        {
            id: 'age',
            label: labels.age,
            validation: yup.string().max(40, t('errorStrMax', { n: 40 })),
        },
        {
            id: 'responsible',
            label: labels.responsible,
            validation: yup.string().max(100, t('errorStrMax', { n: 100 })),
        },
        {
            id: 'description',
            label: labels.description,
            validation: yup.string().max(255, t('errorStrMax', { n: 255 })),
        },
        {
            id: 'ringNumber',
            label: labels.ringNumber,
            visible: data.type === sampleTypes.BIRD,
            validation: yup.string().max(40, t('errorStrMax', { n: 40 })),
        },
        {
            id: 'company',
            label: labels.company,
            visible: data.type === sampleTypes.BIRD || data.type === sampleTypes.MAMMAL,
            validation: yup.string().max(100, t('errorStrMax', { n: 100 })),
        },
        {
            id: 'cs',
            label: labels.cs,
            visible: data.type === sampleTypes.PSRER,
            validation: yup.string().max(40, t('errorStrMax', { n: 40 })),
        },
        {
            id: 'sr',
            label: labels.sr,
            visible: data.type === sampleTypes.PSRER,
            validation: yup.string().max(40, t('errorStrMax', { n: 40 })),
        },
        {
            id: 'waterbody',
            label: labels.waterbody,
            visible: data.type === sampleTypes.FISH || data.type === sampleTypes.AI,
            validation: yup.string().max(255, t('errorStrMax', { n: 255 })),
        },
        {
            id: 'dna',
            label: labels.dna,
            visible: data.type === sampleTypes.FISH,
            validation: yup.string().max(100, t('errorStrMax', { n: 100 })),
        },
        {
            id: 'lat',
            label: labels.lat,
            validation: yup
                .number()
                .min(-90, t('errorNumMin', { n: -90 }))
                .max(90, t('errorNumMax', { n: 90 })),
        },
        {
            id: 'lon',
            label: labels.lon,
            validation: yup
                .number()
                .min(-180, t('errorNumMin', { n: -180 }))
                .max(180, t('errorNumMax', { n: 180 })),
        },
    ].filter((column) => column.visible !== false);

    const initialValues = Object.fromEntries(
        columns.map((col) => [col.id, isNewSample ? '' : data.sample[col.id] || ''])
    );

    const validationShape = {};
    columns.forEach((column) => {
        validationShape[column.id] = column.validation;
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: yup.object().shape(validationShape),
        onSubmit: (values, { setSubmitting }) => {
            const sample = { ...values };

            sample.id = data.sample.id || null;
            sample.lat = parseFloat(sample.lat);
            sample.lon = parseFloat(sample.lon);
            sample.specieId = species.find((s) => s.nameLat === sample.nameLat).id;
            sample.type = data.type;

            onSave(sample);

            setSubmitting(true);
        },
    });

    const { errors, handleSubmit, isSubmitting } = formik;

    useEffect(() => {
        formik.setSubmitting(false);

        Object.keys(serverValidationErrors).forEach((field) => {
            formik.setFieldError(field, serverValidationErrors[field]);
        });
    }, [serverValidationErrors, serverGeneralError]);

    useEffect(() => {
        if (open) {
            formik.resetForm();
        }
    }, [open]);

    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    const handleMapClick = (e) => {
        const coords = e.get('coords');
        formik.setFieldValue('lat', Number.parseFloat(coords[0]).toPrecision(6));
        formik.setFieldValue('lon', Number.parseFloat(coords[1]).toPrecision(6));
    };

    return (
        <FormikProvider value={formik}>
            <SubmitModal
                title={isNewSample ? t('samplesCreateTitle') : t('samplesUpdateTitle')}
                error={serverGeneralError}
                loading={loading}
                open={open}
                onClose={handleClose}
                onSubmit={handleSubmit}
                disabledSubmit={isSubmitting || loading || (errors && Object.keys(errors).length > 0)}
                bodyContent={
                    <form onSubmit={handleSubmit}>
                        {columns.map((col) =>
                            col.isSelectInput ? (
                                <SampleSelectInput key={col.id} col={col} species={species} />
                            ) : (
                                <SampleTextInput key={col.id} col={col} />
                            )
                        )}
                        <SampleMap samples={[formik.values]} height="400px" onClick={handleMapClick} />
                    </form>
                }
            />
        </FormikProvider>
    );
}

EditModal.propTypes = {
    data: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    serverGeneralError: PropTypes.string,
    open: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    isNewSample: PropTypes.bool.isRequired,
    serverValidationErrors: PropTypes.object,
};

export default EditModal;
