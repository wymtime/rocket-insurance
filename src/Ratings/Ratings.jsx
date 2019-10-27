import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '../Reusables';

const Ratings = ({ quote }) => {
  const { 
    policy_holder: {
      first_name: firstName,
      last_name: lastName,
    },
    variable_options: {
      deductible: deductibleOptions,
      asteroid_collision: asteroidCollsionOptions,
    },
    variable_selections: {
      deductible: deductibleSelection,
      asteroid_collision: asteroidCollsionSelection,
    },
    premium,
  } = quote;
  return (
    <div>
      Ratings
      <div>
        <div>First Name: {firstName}</div>
        <div>Last Name: {lastName}</div>
      </div>
    </div>
  );
}

Ratings.propTypes = {
  quote: PropTypes.objectOf({
    policy_holder: PropTypes.object,
    variable_options: PropTypes.object,
    variable_selections: PropTypes.object,
  }),
}

export default Ratings;