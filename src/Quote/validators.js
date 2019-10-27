const isEmpty = (value) => {
  return value === ''
    ? 'Cannot be empty.'
    : '';
};

const isValidPostal = (value) => {
  return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value)
    ? 'Invalid postal code.'
    : '';
};

export {
  isEmpty,
  isValidPostal,
};