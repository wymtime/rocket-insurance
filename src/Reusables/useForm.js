import { useState, useEffect } from 'react';

const useForm = (defaultState, submitCallback) => {
  const [values, setValues] = useState(defaultState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const handleChange = name => event => {
    const input = values[name];
    setValues({
      ...values,
      [name]: { ...input, value: event.target.value },
    });
  };

  const validateInputs = () => {
    const errors = {};

    Object.keys(values).forEach(name => {
      const input = values[name];
      const { value, validators } = input;

      const error = validators
        .map(validator => validator(value))
        .find(err =>  err !== '');
      
      if (error) errors[name] = error;
    });

    setErrors(errors)
  };

  const handleSubmit = data => {
    validateInputs();
    setSubmitting(true);
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submitCallback();
    }
    setSubmitting(false);
  }, [errors, isSubmitting]);

  return { values, errors, handleChange, handleSubmit };
};

export default useForm;