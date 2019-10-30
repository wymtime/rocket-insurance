import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('renders Rocket Insurance header', () => {
  const { getByText } = render(<App />);
  expect(getByText('Rocket Insurance')).toBeInTheDocument();
});