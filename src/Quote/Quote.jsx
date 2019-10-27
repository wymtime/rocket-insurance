import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from "@reach/router"
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { isEmpty, isValidPostal } from './validators';
import { useForm } from '../Reusables';

import styles from './Quote.module.css';

const Quote = ({ setQuote }) => {
  const defaultState = {
    firstName: { value: '', validators: [isEmpty] },
    lastName: { value: '', validators: [isEmpty] },
    line1: { value: '', validators: [isEmpty] },
    line2: { value: '', validators: [] },
    city: { value: '', validators: [isEmpty] },
    region: { value: '', validators: [isEmpty, isValidPostal] },
    postal: { value: '', validators: [isEmpty] },
  };

  const handleQuoteSubmission = async (data) => {
    try {
      const { quote } = await axios
        .post('https://fed-challenge-api.sure.now.sh/api/v1/quotes', data);

      setQuote(quote);
      navigate('/ratings');
    } catch (err) {

    }
  }

  const {
    values, errors, handleChange, handleSubmit,
  } = useForm(defaultState, handleQuoteSubmission);

  const {
    firstName, lastName, line1, line2,
    city, region, postal,
  } = values;

  const quoteData = {
    first_name: firstName,
    last_name: lastName,
    address: {
      line_1: line1,
      line_2: line2,
      city,
      region,
      postal,
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" gutterBottom>
        Quote
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            onChange={handleChange('firstName')}
            required
            value={firstName.value}
            helperText={firstName.error}
            error={!!firstName.error}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            onChange={handleChange('lastName')}
            required
            value={lastName.value}
            helperText={errors.lastName}
            error={!!errors.lastName}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Address Line 1"
            onChange={handleChange('line1')}
            required
            value={line1.value}
            helperText={errors.line1}
            error={!!errors.line1}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Address Line 2"
            onChange={handleChange('line2')}
            value={line2.value}
            helperText={errors.line2}
            error={!!errors.line2}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="City"
            onChange={handleChange('city')}
            required
            value={city.value}
            helperText={errors.city}
            error={!!errors.city}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Region"
            onChange={handleChange('region')}
            required
            value={region.value}
            helperText={errors.region}
            error={!!errors.region}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Postal Code"
            onChange={handleChange('postal')}
            required
            value={postal.value}
            helperText={errors.postal}
            error={!!errors.postal}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button
            color="primary"
            onClick={() => handleSubmit(quoteData)}
            size="large"
            variant="contained">
              Submit
          </Button>
      </Grid>
      </Grid>
    </Container>
  );
}

Quote.propTypes = {
  setQuote: PropTypes.func.isRequired,
};

export default Quote;