import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ options }) => {
  return (
      <select>
        {options.map(option => option)}
      </select>
  );
};

Select.defaultProps = {};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
};

export default Select;