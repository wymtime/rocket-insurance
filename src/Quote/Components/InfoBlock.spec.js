import React from 'react';
import { render, getByText, fireEvent } from '@testing-library/react';

import InfoBlock from './InfoBlock';

const infoBlockProps = {
  title: 'Hello World',
  lines: ['First line', 'Second line']
};

function renderInfoBlock() {
  return render(<InfoBlock {...infoBlockProps}/>);
}

test('renders a InfoBlock component', () => {
  const { getByText } = renderInfoBlock();
  expect(getByText('Hello World')).toBeInTheDocument();
});

test('renders 2 lines', () => {
  const { getByText } = renderInfoBlock();
  expect(getByText('First line')).toBeInTheDocument();
  expect(getByText('Second line')).toBeInTheDocument();
});