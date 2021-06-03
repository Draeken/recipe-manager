import { render } from '@testing-library/react';

import RecipesManagerFeatureIndex from './RecipesManagerFeatureIndex';

describe('RecipesManagerFeatureIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RecipesManagerFeatureIndex />);
    expect(baseElement).toBeTruthy();
  });
});
