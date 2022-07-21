import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { MenuItem, TextField } from 'Common';

const inputLabelProps = {
    shrink: true,
};

const SelectInput = ({ required, disabled, id, label, options }) => {
    const { errors, touched, handleChange, values } = useFormikContext();

    return (
        <TextField
            required={required}
            select={true}
            fullWidth
            disabled={disabled}
            margin="dense"
            id={id}
            name={id}
            label={label}
            value={values[id]}
            InputLabelProps={inputLabelProps}
            onChange={handleChange}
            error={errors[id] && touched[id]}
            helperText={errors[id] && touched[id] && errors[id]}
        >
            <MenuItem key="empty-item" value="" />
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

SelectInput.propTypes = {
    required: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
};

export default SelectInput;
