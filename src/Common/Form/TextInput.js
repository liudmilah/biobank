import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { TextField } from 'Common';

const inputLabelProps = {
    shrink: true,
};

const TextInput = ({ id, label, type = 'string', required = false, disabled = false }) => {
    const { errors, touched, handleChange, values, handleBlur } = useFormikContext();

    return (
        <TextField
            required={required}
            disabled={disabled}
            fullWidth
            margin="dense"
            type={type}
            id={id}
            name={id}
            label={label}
            value={values[id]}
            InputLabelProps={inputLabelProps}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors[id] && touched[id]}
            helperText={errors[id] && touched[id] && errors[id]}
        />
    );
};

TextInput.propTypes = {
    required: PropTypes.bool,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
};

export default TextInput;
