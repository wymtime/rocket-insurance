import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Container, Divider, Grid, Paper, Typography,
} from '@material-ui/core';

import { Select } from '../Reusables';
import InfoBlock from './Components/InfoBlock';

import styles from './Quote.module.css';

const Quote = ({ quote }) => {
  const {
    policy_holder: {
      first_name: firstName,
      last_name: lastName,
    },
    rating_address: {
      line_1: line1,
      line_2: line2,
      city,
      region,
      postal,
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

  const [values, setValues] = useState({
    deductible: deductibleSelection,
    asteroidCollision: asteroidCollsionSelection,
  });

  const handleChange = (name) => (event) => {
    const { value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const { asteroidCollision, deductible } = values;

  const currencyFormatter = (value) => `$${value}`;

  return (
    <Container maxWidth="sm">
      <Paper className={styles.paper}>
        <Typography variant="h5" gutterBottom>
          Quote
        </Typography>
        <br />
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12}>
            <Divider light />
            <InfoBlock
              title="Name"
              lines={[`${firstName} ${lastName}`]}
            />
            <InfoBlock
              title="Address"
              lines={[`${line1} ${line2}`, `${city}, ${region}, ${postal}`]}
            />
            <InfoBlock
              title="Premium"
              lines={[`$${premium}`]}
            />
            <Divider light />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Select
              title={deductibleOptions.title}
              values={deductibleOptions.values}
              helperText={deductibleOptions.description}
              selection={deductible}
              valueFormatter={currencyFormatter}
              onChange={handleChange('deductible')}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Select
              title={asteroidCollsionOptions.title}
              values={asteroidCollsionOptions.values}
              helperText={asteroidCollsionOptions.description}
              selection={asteroidCollision}
              valueFormatter={currencyFormatter}
              onChange={handleChange('asteroidCollision')}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

Quote.defaultProps = {
  quote: {
    policy_holder: {
      first_name: '',
      last_name: '',
    },
    variable_options: {
      deductible: {},
      asteroid_collision: {},
    },
    variable_selections: {
      deductible: 0,
      asteroid_collision: 0,
    },
    premium: 0,
  },
};

Quote.propTypes = {
  quote: PropTypes.shape({
    policy_holder: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
    rating_address: PropTypes.shape({
      line_1: PropTypes.string.isRequired,
      line_2: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
      postal: PropTypes.string.isRequired,
    }),
    variable_options: PropTypes.shape({
      deductible: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        values: PropTypes.array,
      }),
      asteroid_collision: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        values: PropTypes.array,
      }),
    }),
    variable_selections: PropTypes.shape({
      deductible: PropTypes.number,
      asteroid_collision: PropTypes.number,
    }),
    premium: PropTypes.number,
  }),
};

export default Quote;
