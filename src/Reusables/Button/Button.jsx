import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, type, text }) => {
    return (
        <button
          onClick={onClick}
          type={type}>
          {text}
        </button>
    );
}

Button.defaultProps = {

};

Button.propTypes = {
  type: PropTypes.string,
};

export default Button;