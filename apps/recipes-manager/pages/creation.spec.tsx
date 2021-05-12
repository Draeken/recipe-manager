import { render } from '@testing-library/react';

import Creation from './creation';

describe('Creation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Creation />);
    expect(baseElement).toBeTruthy();
  });
});
