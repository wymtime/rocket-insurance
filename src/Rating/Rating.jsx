import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  Button, Container, Grid, Paper, Typography,
} from '@material-ui/core';

import { Input } from '../Reusables';
import { isEmpty, isValidPostal, snakeCaseRating } from './utils';

import useValidation from './useValidation';

import styles from './Rating.module.css';

const Rating = ({
  rating,
  updateName,
  updateAddress,
  setQuote,
}) => {
  const {
    firstName,
    lastName,
    address: {
      line1, line2, city, region, postal,
    },
  } = rating;

  const [nameErrors, validateName] = useValidation({
    firstName: { value: firstName, validators: [isEmpty] },
    lastName: { value: lastName, validators: [isEmpty] },
  });
  const [addressErrors, validateAddress] = useValidation({
    line1: { value: line1, validators: [isEmpty] },
    line2: { value: line2, validators: [] },
    city: { value: city, validators: [isEmpty] },
    region: { value: region, validators: [isEmpty] },
    postal: { value: postal, validators: [isEmpty, isValidPostal] },
  });

  const handleNameChange = (field) => (event) => {
    const { value } = event.target;
    updateName(field, value);
  };

  const handleAddressChange = (field) => (event) => {
    const { value } = event.target;
    updateAddress(field, value);
  };

  const history = useHistory();

  const fetchQuote = () => {
    const payload = snakeCaseRating(rating);

    return axios.post('https://fed-challenge-api.sure.now.sh/api/v1/quotes', payload)
      .then((response) => {
        const { quote } = response.data;
        setQuote(quote);
        history.push('/quote');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleQuoteSubmission = () => {
    const nameHasError = validateName();
    const addressHasError = validateAddress();

    if (nameHasError || addressHasError) return;

    fetchQuote();
  };

  return (
    <Container maxWidth="sm">
      <Paper className={styles.paper}>
        <Typography variant="h5" gutterBottom>
          Rating
        </Typography>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Input
              label="First Name"
              onChange={handleNameChange('firstName')}
              required
              value={firstName}
              helperText={nameErrors.firstName}
              error={nameErrors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Last Name"
              onChange={handleNameChange('lastName')}
              required
              value={lastName}
              error={nameErrors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Address Line 1"
              onChange={handleAddressChange('line1')}
              required
              value={line1}
              error={addressErrors.line1}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Address Line 2"
              onChange={handleAddressChange('line2')}
              value={line2}
              error={addressErrors.line2}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="City"
              onChange={handleAddressChange('city')}
              required
              value={city}
              error={addressErrors.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Region"
              onChange={handleAddressChange('region')}
              required
              value={region}
              error={addressErrors.region}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Postal Code"
              onChange={handleAddressChange('postal')}
              required
              value={postal}
              error={addressErrors.postal}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              color="primary"
              onClick={handleQuoteSubmission}
              size="large"
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

Rating.propTypes = {
  setQuote: PropTypes.func.isRequired,
  rating: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    address: PropTypes.object.isRequired,
  }).isRequired,
  updateName: PropTypes.func.isRequired,
  updateAddress: PropTypes.func.isRequired,
};

export default Rating;
