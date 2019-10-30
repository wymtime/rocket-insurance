import React from 'react';
import { render, getByText, fireEvent } from '@testing-library/react';

import Quote from './Quote';


const quote = {
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
    premium: 6000,
};

function renderQuote() {
  const utils = render(
    <Quote
      quote={quote}
    />
  );
  return utils;
}

test('should render a Deductible Select component', () => {
  const { getByText } = renderQuote();
  expect(getByText('Deductible')).toBeInTheDocument();
  expect(getByText('The amount of money you will pay in an insurance claim before the insurance coverage kicks in.')).toBeInTheDocument();
});

test('should render a Asteroid Collision Limit Select component', () => {
  const { getByText } = renderQuote();
  expect(getByText('Asteroid Collision Limit')).toBeInTheDocument();
  expect(getByText('The maximum amount covered for damages caused by asteroid collisions.')).toBeInTheDocument();
});

test('should render options for each deductible option', () => {
  const { getByText } = renderQuote();
  expect(getByText('$500')).toBeInTheDocument();
  // expect(getByText('$1000')).toBeInTheDocument();
  // expect(getByText('$2000')).toBeInTheDocument();
});

