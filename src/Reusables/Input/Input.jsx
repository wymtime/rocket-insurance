import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './Input.module.css';

const Input = ({ type, onChange, value }) => {
  return (
    <input
      type={type}
      onChange={({ target: { value } }) => {
        onChange(value);
      }}
      value={value}
    />
  );
}

Input.defaultProps = {
  type: 'text',
  value: '',
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default Input;