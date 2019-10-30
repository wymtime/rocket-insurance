import { useState } from 'react';

const useValidation = (defaultState) => {
  const [errors, setErrors] = useState({});

  const validateValues = () => {
    const currentErrors = {};
    let hasError = false;

    Object.keys(defaultState).forEach((name) => {
      const input = defaultState[name];
      const { value, validators } = input;

      const error = validators
        .map((validator) => validator(value))
        .find((err) => err !== '');

      if (error) {
        currentErrors[name] = error;
        hasError = true;
      }
    });

    setErrors(currentErrors);

    return hasError;
  };

  return [errors, validateValues];
};

export default useValidation;
