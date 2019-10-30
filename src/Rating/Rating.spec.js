import React from 'react';
import { render, getByTitle, queryByText, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Rating from './Rating';

const ratingProps = {
  rating: {
    firstName: 'Prairie',
    lastName: 'Johnson',
    address: {
      line1: '123 Mulberry Lane',
      line2: '3B',
      city: 'Brooklyn',
      region: 'NY',
      postal: '11211'
    }
  },
  updateName: jest.fn(),
  updateAddress: jest.fn(),
  setQuote: jest.fn(),
}

const quote = {
  quote: {
      quoteId: "UP5413263",
      rating_address: {
          "line_1": "123 Mulberry Lane",
          "line_2": "3B",
          "city": "Brooklyn",
          "region": "NY",
          "postal": "11211"
      },
      policy_holder: {
          "first_name": "Prairie",
          "last_name": "Prairie"
      },
      variable_options: {
          "deductible": {
              "title": "Deductible",
              "description": "The amount of money you will pay in an insurance claim before the insurance coverage kicks in.",
              "values": [
                  500,
                  1000,
                  2000
              ]
          },
          "asteroid_collision": {
              "title": "Asteroid Collision Limit",
              "description": "The maximum amount covered for damages caused by asteroid collisions.",
              "values": [
                  100000,
                  300000,
                  500000,
                  1000000
              ]
          }
      },
      variable_selections: {
          "deductible": 500,
          "asteroid_collision": 100000
      },
      premium: 6000
  }
};

function renderRating(props) {
  const utils = render(
    <Rating
      { ...ratingProps }
      { ...props}
    />, { wrapper: MemoryRouter }
  );
  return utils;
}

test('renders the Rating title', () => {
  const { getByText } = renderRating();
  expect(getByText('Rating')).toBeInTheDocument();
});

test('renders all TextInputs', () => {
  const { getByText } = renderRating();
  expect(getByText('First Name')).toBeInTheDocument();
  expect(getByText('Last Name')).toBeInTheDocument();
  expect(getByText('Address Line 1')).toBeInTheDocument();
  expect(getByText('Address Line 2')).toBeInTheDocument();
  expect(getByText('City')).toBeInTheDocument();
  expect(getByText('Region')).toBeInTheDocument();
  expect(getByText('Postal Code')).toBeInTheDocument();
});

test('renders all TextInputs with values correct values when props are provided', () => {
  const { container } = renderRating();

  const firstNameTextInput = getByTitle(container, 'First Name');
  expect(firstNameTextInput.value).toEqual('Prairie');

  const lastNameTextInput = getByTitle(container, 'Last Name');
  expect(lastNameTextInput.value).toEqual('Johnson');

  const addressLine1TextInput = getByTitle(container, 'Address Line 1');
  expect(addressLine1TextInput.value).toEqual('123 Mulberry Lane')

  const addressLine2TextInput = getByTitle(container, 'Address Line 2');
  expect(addressLine2TextInput.value).toEqual('3B');

  const cityTextInput = getByTitle(container, 'City');
  expect(cityTextInput.value).toEqual('Brooklyn');

  const regionTextInput = getByTitle(container, 'Region');
  expect(regionTextInput.value).toEqual('NY');

  const postalTextInput = getByTitle(container, 'Postal Code');
  expect(postalTextInput.value).toEqual('11211');
});

test('calls updateName when onChange name input is changed', () => {
  const { container } = renderRating();

  const firstNameTextInput = getByTitle(container, 'First Name');

  fireEvent.change(firstNameTextInput, { target: { value: '' } });
  expect(ratingProps.updateName).toHaveBeenCalledTimes(1)
});

test('calls updateAddress when onChange address input is changed', () => {
  const { container } = renderRating();

  const cityTextInput = getByTitle(container, 'City');

  fireEvent.change(cityTextInput, { target: { value: 'Los Angeles' } });
  expect(ratingProps.updateAddress).toHaveBeenCalledTimes(1)
});

test('displays no error messages if required TextInputs are filled and submit button is clicked', () => {
  const { container } = renderRating();
  expect(queryByText(container, 'Cannot be empty')).not.toBeInTheDocument();
});

test('displays an error message if a required field is missing and submit button is clicked', () => {
  const { getByText } = renderRating({
    rating: { ...ratingProps.rating, firstName: '' }
  });

  const button = getByText('Submit').closest('button');
  fireEvent.click(button);
  expect(getByText('Cannot be empty.')).toBeInTheDocument();
});