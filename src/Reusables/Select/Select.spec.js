import React from 'react';
import { render } from '@testing-library/react';

import Select from './Select';

const selectProps = {
  title: "Select",
  values: ['Item 1', 'Item 2', 'Item 3'],
  helperText: "Numbers",
  selection: 'Item 1',
  valueFormatter: jest.fn(),
  onChange: jest.fn(),
};

function renderSelect() {
  return render(
    <Select {...selectProps} />
  );
}

test('it renders Select component', () => {
  const { getByText } = renderSelect();
  expect(getByText('Select')).toBeInTheDocument();
});
