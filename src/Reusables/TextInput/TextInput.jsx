import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';

const TextInput = ({
  label,
  defaultValue,
  value,
  onChange,
  error,
  required,
}) => (
  <TextField
    label={label}
    inputProps={{ title: label }}
    onChange={onChange}
    required={required}
    value={value || defaultValue}
    helperText={error}
    error={!!error}
    variant="outlined"
  />
);

TextInput.defaultProps = {
  defaultValue: '',
  error: '',
  onChange: () => {},
  required: false,
  value: '',
};

TextInput.propTypes = {
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default TextInput;
