import React from 'react';
import { render, getByTitle, queryByText, fireEvent } from '@testing-library/react';

import TextInput from './TextInput';

const textInputProps = {
  label: 'Test',
  defaultValue: null,
  value: 'This is a test',
  onChange: jest.fn(),
  error: '',
  required: false,
};

function renderTextInput() {
  return render(<TextInput {...textInputProps} />);
}

test('it renders a TextInput component', () => {
  const { getByTitle } = renderTextInput();
  expect(getByTitle('Test')).toBeInTheDocument();
});

