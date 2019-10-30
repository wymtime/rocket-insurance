import { useState } from 'react';

const useForm = (defaultState, updateCallback) => {
  const [values, setValues] = useState(defaultState);
  const [errors, setErrors] = useState({});

  const handleChange = (name) => (event) => {
    const input = values[name];
    const { value } = event.target;

    setValues({
      ...values,
      [name]: { ...input, value },
    });

    if (updateCallback) updateCallback(name, value);
  };

  const validateValues = () => {
    const currentErrors = {};

    Object.keys(values).forEach((name) => {
      const input = values[name];
      const { value, validators } = input;

      const error = validators
        .map((validator) => validator(value))
        .find((err) => err !== '');

      if (error) currentErrors[name] = error;
    });

    setErrors(currentErrors);
  };

  // const handleSubmit = data => () => {
  //   validateInputs();
  //   if (Object.keys(errors).length === 0) submitCallback(data);
  // }

  // useEffect(() => {
  // }, [errors, isSubmitting]);

  return [values, errors, handleChange, validateValues];
};

export default useForm;
