import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Select as MaterialSelect,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
} from '@material-ui/core';

import styles from './Select.module.css';

const Select = ({
  title,
  values,
  helperText,
  selection,
  valueFormatter,
  onChange,
}) => {
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl variant="outlined">
      <InputLabel className={styles.label} ref={inputLabel}>{title}</InputLabel>
      <MaterialSelect
        className={styles.select}
        labelWidth={labelWidth}
        value={selection}
        onChange={onChange}
      >
        {values.map((value) => (
          <MenuItem
            key={`item-${value}`}
            value={value}
          >
            {valueFormatter(value)}
          </MenuItem>
        ))}
      </MaterialSelect>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

Select.defaultProps = {
  helperText: '',
};

Select.propTypes = {
  title: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])).isRequired,
  helperText: PropTypes.string,
  selection: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  valueFormatter: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
