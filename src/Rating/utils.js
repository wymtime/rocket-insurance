const snakeCaseRating = (rating) => ({
  first_name: rating.firstName,
  last_name: rating.lastName,
  address: {
    line_1: rating.address.line1,
    line_2: rating.address.line2,
    city: rating.address.city,
    region: rating.address.region,
    postal: rating.address.postal,
  },
});

const isEmpty = (value) => {
  return value === ''
    ? 'Cannot be empty.'
    : '';
};

const isValidPostal = (value) => {
  return !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value)
    ? 'Invalid postal code.'
    : '';
};

export {
  isEmpty,
  isValidPostal,
  snakeCaseRating,
};
