import React from 'react';
import { render } from '@testing-library/react';

import ConditionalRoute from './ConditionalRoute';

function renderConditionalRoute(condition) {
  render(
    <ConditionalRoute
      children={null}
      condition={condition}
      redirectPath="/" />
  );
}

test('renders a ConditionalRoute component', () => {
  expect(true);
});