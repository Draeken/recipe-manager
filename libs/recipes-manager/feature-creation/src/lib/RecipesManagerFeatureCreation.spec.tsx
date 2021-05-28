import { render } from '@testing-library/react';

import RecipesManagerFeatureCreation from './RecipesManagerFeatureCreation';

describe('RecipesManagerFeatureCreation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RecipesManagerFeatureCreation />);
    expect(baseElement).toBeTruthy();
  });
});
